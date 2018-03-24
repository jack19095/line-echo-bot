const _ = require('lodash');

const homeTemplate = require('../message-templates/home');
const bookingTemplate = require('../message-templates/booking');

const User = require('../models/user');

module.exports = async(context, data) => {
  try {
    let { event, client } = context;
    let replyToken = _.get(event, 'replyToken');
    let lineId = _.get(event, 'source.userId');
    let { action } = data;
    let parseUser = await User.current(lineId) || {};
    let userId = parseUser.id;
    let userContext = parseUser.getContext();

    switch (action) {
    case 'show_register':
      return client.replyMessage(replyToken, homeTemplate.register(lineId));
    case 'ask_use_photo':
      await parseUser.setContextObject({
        state: 'SENDING_PHOTO',
      });
      return client.replyMessage(replyToken, bookingTemplate.prepareCustomerInfoByPhotos());
    case 'booking_finish_customer_photo':
      return client.replyMessage(replyToken, [
        bookingTemplate.confirmCustomerInfoAfterSendingPhoto(parseUser.id, userContext.productCategory)
      ]);
    case 'booking_cancel':
      await parseUser.setContextObject({
        state: 'init',
      });
      return client.replyMessage(replyToken, { type: 'text', text: '已取消報備' });
    case 'booking_started':
      let { productCategory } = data;
      if (productCategory === 'HyperINF') {
        return client.replyMessage(replyToken, { type: 'text', text: '尚未支援此產品 HyperINF' });
      }
      await parseUser.setContextObject({
        state: 'ASK_CUSTOMER_INFO',
        productCategory,
      });
      return client.replyMessage(replyToken, bookingTemplate.askCustomerInfo(userId));
    }
  } catch (error) {
    console.error(error);
  }
};
