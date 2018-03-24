const _ = require('lodash');
const config = require('config');

const homeTemplate = require('../message-templates/home');
const bookingTemplate = require('../message-templates/booking');
const bonusTemplate = require('../message-templates/bonus');
const reviewTemplate = require('../message-templates/review');

const User = require('../models/user');

const richMenu = config.get('RICH_MENU');

module.exports = async (context, text) => {
  let { client, event } = context;

  let lineId = _.get(event, 'source.userId');
  let replyToken = _.get(event, 'replyToken');

  let { displayName } = (await client.getProfile(lineId));
  let parseUser = await User.current(lineId);

  console.log(lineId, parseUser);

  switch (text) {
  case '申請會員':
  case '啟用會員':
    return client.replyMessage(replyToken, homeTemplate.register(lineId));
  case '申請報備':
    await parseUser.setContext('state', 'BOOKING_STARTED');
    if (parseUser.get('type') === 'ulink') {
      return client.replyMessage(replyToken, [
        bookingTemplate.apply(displayName), bookingTemplate.apply2Ulink(parseUser.id)
      ]);
    } else if (parseUser.get('type') === 'dealer') {
      return client.replyMessage(replyToken, [
        bookingTemplate.apply(displayName), bookingTemplate.apply2Dealer(parseUser.id)
      ]);
    } else {
      return client.replyMessage(replyToken, {
        type: 'text', text: '資格不符無法報備'
      });
    }
  case '紅利查詢':
    return client.replyMessage(replyToken, bonusTemplate.welcome(parseUser.id));
  case '確認審核':
  case '資格審核':
    return client.replyMessage(replyToken, reviewTemplate.review(parseUser.id));
  case '報備處理':
    if (parseUser.get('type') === 'ulink') {
      return client.replyMessage(replyToken, [
        bookingTemplate.apply(displayName), bookingTemplate.apply2Ulink(parseUser.id)
      ]);
    } else {
      return client.replyMessage(replyToken, {
        type: 'text', text: '資格不符無法報備'
      });
    }
  case '完成':
    let context = parseUser.getContext();
    if (context.state === 'COMPANY_CREATE_DONE') {
      await parseUser.setContext('state', 'init');
      return client.replyMessage(replyToken, [
        bookingTemplate.confirmCustomerInfo1(context.bookingCompany),
        bookingTemplate.confirmCustomerInfo2(parseUser.id, context.productCategory)
      ]);
    } else {
      return client.replyMessage(replyToken, {
        type: 'text', text: '錯誤指令'
      });
    }
  case 'set_user_type_dealer':
    parseUser.set('type', 'dealer');
    await client.linkRichMenuToUser(lineId, richMenu.dealer);
    await parseUser.save();
    return client.replyMessage(replyToken, {
      type: 'text',
      text: '已把帳號設定為經銷商'
    });
  case 'set_user_type_general':
    parseUser.set('type', 'general');
    await client.linkRichMenuToUser(lineId, richMenu.normal);
    await parseUser.save();
    return client.replyMessage(replyToken, {
      type: 'text',
      text: '已把帳號設定為一般使用者'
    });
  case 'set_user_type_ulink':
    parseUser.set('type', 'ulink');
    await client.linkRichMenuToUser(lineId, richMenu.ulink);
    await parseUser.save();
    return client.replyMessage(replyToken, {
      type: 'text',
      text: '已把帳號設定為宇聯員工'
    });
  case 'state':
    let state = parseUser.getState();
    return client.replyMessage(replyToken, {
      type: 'text',
      text: state,
    });
  case '申請報修':
  case '課程與活動':
  case '檔案下載':
  case '免費試用':
  case '報修處理':
  case '試用審核':
  case '試用申請':
    return client.replyMessage(replyToken, { type: 'text', text: '尚未開放' });
  default:
    client.replyMessage(replyToken, homeTemplate.welcome(displayName));
    break;
  }
};
