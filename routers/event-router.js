const _ = require('lodash');
const config = require('config');

const textRouter = require('./text-router');
const postbackRouter = require('./postback-router');
const homeTemplate = require('../message-templates/home');
const bookingTemplate = require('../message-templates/booking');
const Parse = require('../models/parse-helper');
const UlinkFile = require('../models/ulink-file');
const User = require('../models/user');

const richMenu = config.get('RICH_MENU');

module.exports = async (context) => {
  let { client, event } = context;

  let type = _.get(event, 'type');
  let replyToken = _.get(event, 'replyToken');
  let sourceType = _.get(event, 'source.type');
  let lineId = _.get(event, 'source.userId');
  let parseUser = await User.current(lineId);

  if (sourceType !== 'user') {
    return client.replyMessage(replyToken, '我們還不支援群組或是聊天室的互動唷！');
  }

  let state = parseUser.getState();
  if (state === 'SENDING_PHOTO') {
    switch (type) {
    case 'message':
      let messageType = _.get(event, 'message.type');
      if (messageType === 'image') {
        let messageId = _.get(event, 'message.id');
        let stream = await client.getMessageContent(messageId);
        let buffer = Buffer.from([]);
        stream.on('data', (chunk) => {
          buffer = Buffer.concat([buffer, chunk]);
        });
        stream.on('end', async() => {
          let file = new Parse.File(`image_${messageId}.png`, { base64: buffer.toString('base64') });
          let ulinkFile = await UlinkFile.create(file);
          if (parseUser) {
            await parseUser.addBookingFile(ulinkFile.id);
          }
        });
        return client.replyMessage(replyToken, bookingTemplate.sendingCustomerInfoByPhotos());
      }
      break;
    case 'postback':
      let data = JSON.parse(event.postback.data) || {};
      if (data.action === 'booking_finish_customer_photo' || data.action === 'booking_cancel') {
        return postbackRouter(context, data);
      }
      break;
    }
    return client.replyMessage(replyToken, bookingTemplate.errorSendingCustomerInfoByPhotos());
  }

  switch (type) {
  case 'message':
    let messageType = _.get(event, 'message.type');
    if (messageType === 'text') {
      return textRouter(context, event.message.text);
    } else {
      return client.replyMessage(replyToken, { type: 'text', text: '我們還不支援文字以外的訊息噢！' });
    }
  case 'postback':
    let data = JSON.parse(event.postback.data) || {};
    return postbackRouter(context, data);
  case 'follow':
    if (!parseUser) {
      let user = new User();
      user.set('lineId', lineId);
      user.set('type', 'unregister');
      user.set('state', 'unregister');
      parseUser = await user.save();
    }
    console.log(`set richmenu on the new user: ${lineId}`);
    let { displayName } = (await client.getProfile(lineId));
    client.replyMessage(replyToken, homeTemplate.welcome(displayName));
    return client.linkRichMenuToUser(lineId, richMenu.normal);
  }
};
