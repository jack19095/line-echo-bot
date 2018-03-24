const config = require('config');
const webUrl = config.get('WEB_URL');

const review = (userId) => {
  return {
    type: 'template',
    altText: 'This is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://i.imgur.com/vF68sph.png',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: '宇聯科技機器人',
      text: '你好，感謝你使用知識科技機器人系統，系統已自動抓取您的資料。',
      actions: [
        {
          type: 'uri',
          label: '會員審查',
          uri: `${webUrl}/user/review?userId=${userId}`
        },
        {
          type: 'uri',
          label: '紅利審查',
          uri: `${webUrl}/bonus/review?userId=${userId}`
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
  review,
};
