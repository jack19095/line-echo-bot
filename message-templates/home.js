const config = require('config');
const webUrl = config.get('WEB_URL');

const welcome = (username = 'LINE 使用者') => {
  return {
    type: 'template',
    altText: 'This is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://i.imgur.com/cXPoU2Z.png',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: '宇聯科技機器人',
      text: `${username}你好，感謝你使用知識科技機器人系統，系統已自動抓取您的資料。`,
      actions: [
        {
          type: 'uri',
          label: '官方網站',
          uri: 'http://www.ulink.com.tw/'
        },
        {
          type: 'uri',
          label: '知識技術網',
          uri: 'http://www.ulink.com.tw/'
        },
        {
          type: 'uri',
          label: '聯絡我們',
          uri: 'http://www.ulink.com.tw/'
        },
        {
          type: 'postback',
          label: '啟用會員',
          data: JSON.stringify({ action: 'show_register' }),
        }
      ]
    }
  };
};

const register = (lineId) => {
  return {
    type: 'template',
    altText: 'This is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://i.imgur.com/mjfJyqV.png',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: '宇聯科技機器人',
      text: '歡迎你使用宇聯科技會員啟用系統，請選擇以下您申請的身份，待審核後即可開始使用。',
      actions: [
        {
          type: 'uri',
          label: '我是經銷商',
          uri: `${webUrl}/user/register?type=dealer&lineId=${lineId}`
        },
        {
          type: 'uri',
          label: '我是一般會員',
          uri: `${webUrl}/user/register?type=normal&lineId=${lineId}`
        },
        {
          type: 'postback',
          label: '我是宇聯員工',
          data: 'type=ulink&action=register'
        },
      ]
    }
  };
};

module.exports = {
  welcome,
  register
};
