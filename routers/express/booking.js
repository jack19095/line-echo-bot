const _ = require('lodash');
const express = require('express');
const moment = require('moment');
const router = express.Router();
const Booking = require('../../models/booking');
const User = require('../../models/user');
const Product = require('../../models/product');
const Company = require('../../models/company');
const ProductBooking = require('../../models/product-booking');
const lineClient = require('../../libs/line-client');

router.get('/create', async(req, res) => {
  let { productCategory = 'unknown', userId, lineId } = req.query;
  try {
    let user;
    if (userId) {
      user = (await User.getById(userId));
    } else if (lineId) {
      user = (await User.current(lineId));
    }

    user = user ? user.toJSON() : { name: '使用者名稱未設定', type: 'general' };

    // check company
    if (!user.company) {
      user.company = { name: '公司未設定' };
    }

    let products = await Product.findByCategoryAndQuality(productCategory);
    let mainProducts = [];
    let minorProducts = [];
    products.forEach((product) => {
      let name = product.get('PdName');
      let pdId = product.get('PdID');
      if (product.get('PdQuality') === '主件') {
        mainProducts.push({ name, pdId });
      } else if (product.get('PdQuality') === '配件') {
        minorProducts.push({ name, pdId });
      }
    });
    res.render('booking-create', {
      productCategory,
      user,
      mainProducts,
      minorProducts,
      currentDate: moment().format('YYYY/MM/DD')
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/create', async(req, res) => {
  console.log(req.body);
  try {
    let { productIds, productAmounts, userId, lineId } = req.body;
    const parseUser = await User.getById(userId);
    if (typeof productIds === 'string' &&
      typeof productAmounts === 'string') {
      productIds = [productIds];
      productAmounts = [productAmounts];
    }

    let booking = await Booking.create(req.body);
    let promises = [];
    for (let i = 0; i < productIds.length; i++) {
      let productId = productIds[i];
      let productAmount = parseInt(productAmounts[i]);
      if (productAmount) {
        promises.push(ProductBooking.create(
        await Product.findByPdId(productId),
        booking,
        productAmount
      ));
      }
    }
    let productBookings = await Promise.all(promises);
    booking.set('productBookingIds', productBookings);
    if (parseUser.getContext().bookingCompany) {
      booking.set('company', new Company(parseUser.getContext().bookingCompany.objectId));
    }
    booking = await booking.save();
    res.send('<html><body><h1>你已成功完成報備，請回到 LINE 介面。</h1></body></html>');
    await parseUser.setContext('state', 'init');
    lineClient.pushMessage(lineId, {
      type: 'text', text: '已確認完成報備！',
    });
    console.log({ booking, productBookings });
  } catch (error) {
    console.error(error);
  }
});

router.get('/overview', async (req, res) => {
  let { userId, ...filter } = req.query;
  let parseUser = await User.getById(userId);
  let type = parseUser.get('type');
  let plugin;
  let bookings = [];
  if (type === 'ulink') {
    bookings = await Booking.getAll(filter);
    plugin = 'bookingReview';
  } else {
    bookings = await Booking.getUserBookings(userId, filter);
  }
  bookings = bookings.map(booking => {
    let newBooking = booking.toJSON();
    newBooking.applicant = _.get(newBooking, 'applicant.name');
    newBooking.company = _.get(newBooking, 'company.name');
    newBooking.createdAt = moment(newBooking.createdAt).format('YYYY/MM/DD');
    return newBooking;
  });
  res.render('generic-table', {
    userId,
    plugin,
    data: bookings,
    keys: ['company', 'productCategory', 'createdAt', 'applicant', 'state'],
    titles: ['客戶名稱', '品牌', '報備日期', '申請人', '報備狀態'],
  });
});

router.get('/detail/:id', async (req, res) => {
  try {
    let { userId } = req.query;
    let id = req.params.id;

    let parseUser = (await User.getById(userId)).toJSON();
    let booking = (await Booking.getById(id)).toJSON();

    booking.closeDate = moment(booking.closeDate).format('YYYY/MM/DD');
    booking.state = Booking.STATE_TRANSLATE_TABLE[booking.state];

    console.log(parseUser, booking);
    res.render('booking-detail', {
      booking, user: parseUser,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    let { userId } = req.query;
    let id = req.params.id;

    let parseUser = (await User.getById(userId)).toJSON();
    let booking = (await Booking.getById(id)).toJSON();

    booking.closeDate = moment(booking.closeDate).format('YYYY/MM/DD');
    booking.state = Booking.STATE_TRANSLATE_TABLE[booking.state];
    if (booking.approvedDate) {
      booking.approvedDate = moment(booking.approvedDate).format('YYYY/MM/DD');
    }

    console.log(parseUser, booking);
    res.render('booking-edit', {
      booking, user: parseUser,
    });
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  let { body } = req;
  let booking = await Booking.getById(req.params.id);
  booking.set(body);
  res.json(await booking.save());
});

router.get('/:id', async (req, res) => {
  res.json(await Booking.getById(req.params.id));
});

router.get('/', async (req, res) => {
  res.json(await Booking.getAll());
});

module.exports = router;
