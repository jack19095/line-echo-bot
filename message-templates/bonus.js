const config = require('config');
const webUrl = config.get('WEB_URL');

const welcome = (userId) => {
  return {
    type: 'template',
    altText: 'This is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://i.imgur.com/tQSS9x8.png',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: '宇聯科技機器人',
      text: '你好，感謝你使用知識科技機器人系統，系統已自動抓取您的資料。',
      actions: [
        {
          type: 'uri',
          label: '我的紅利',
          uri: `${webUrl}/bonus/summary?userId=${userId}`,
        },
        {
          type: 'uri',
          label: '獎勵方案',
          uri: 'http://www.ulink.com.tw/'
        },
      ]
    }
  };
};

module.exports = {
  welcome,
};
