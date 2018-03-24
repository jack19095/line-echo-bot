const config = require('config');
const webUrl = config.get('WEB_URL');

const apply = (username, userId) => {
  return {
    type: 'template',
    altText: 'booking template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://i.imgur.com/bBybgXr.png',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: '宇聯科技機器人',
      text:
        `${username}你好，歡迎你使用宇聯 Booking 報備系統，請選擇以下需要申請的品牌或服務項目。`,
      actions: [
        {
          type: 'postback',
          label: '報備 DataCore',
          data: JSON.stringify({
            userId,
            action: 'booking_started',
            productCategory: 'DataCore'
          }),
        },
        {
          type: 'postback',
          label: '報備 NAKIVO',
          data: JSON.stringify({
            userId,
            action: 'booking_started',
            productCategory: 'NAKIVO'
          }),
        },
        {
          type: 'postback',
          label: '報備 GoGlobal',
          data: JSON.stringify({
            userId,
            action: 'booking_started',
            productCategory: 'GoGlobal'
          }),
        },
        {
          type: 'postback',
          label: '報備 HyperINF',
          data: JSON.stringify({
            userId,
            action: 'booking_started',
            productCategory: 'HyperINF'
          }),
        },
      ]
    }
  };
};

const apply2Ulink = (userId) => {
  return {
    type: 'template',
    altText: 'booking template2',
    template: {
      type: 'buttons',
      title: '宇聯科技機器人',
      text: '報備選項',
      actions: [
        {
          type: 'uri',
          label: '報備總覽',
          uri: `${webUrl}/booking/overview?userId=${userId}`,
        },
        {
          type: 'uri',
          label: '報備處理',
          uri: `${webUrl}/booking/overview?userId=${userId}&state=pending`,
        },
      ]
    }
  };
};
const apply2Dealer = (userId) => {
  return {
    type: 'template',
    altText: 'booking template2',
    template: {
      type: 'buttons',
      title: '宇聯科技機器人',
      text: '報備選項',
      actions: [
        {
          type: 'uri',
          label: '報備總覽',
          uri: `${webUrl}/booking/overview?userId=${userId}`,
        }
      ]
    }
  };
};

const askCustomerInfo = (userId) => {
  return {
    type: 'template',
    altText: 'booking template2',
    template: {
      type: 'buttons',
      title: '宇聯科技機器人',
      text: '歡迎你使用宇聯 Booking 報備系統，首先需要輸入客戶資料，你可以選擇以下兩種方式來提供客戶資料。',
      actions: [
        {
          type: 'postback',
          label: '拍攝客戶名片照片',
          data: JSON.stringify({ action: 'ask_use_photo' }),
        },
        {
          type: 'uri',
          label: '填寫客戶資訊表單',
          uri: `${webUrl}/company/create?userId=${userId}`,
        },
      ]
    }
  };
};

const confirmCustomerInfo1 = (company) => {
  let keysChn = ['名字', '統編', '電話', '地址'];
  let keys = ['name', 'companyId', 'phone', 'address'];
  let text = '\n';
  for (let i = 0; i < keys.length; i++) {
    text += `${keysChn[i]}：${company[keys[i]]}\n`;
  }

  return {
    type: 'text',
    text: `請確認以下公司資訊：${text}`,
  };
};

const confirmCustomerInfo2 = (userId, productCategory) => {
  return {
    type: 'template',
    altText: 'booking template2',
    template: {
      type: 'buttons',
      title: '宇聯科技機器人',
      text: `確認無誤後將繼續報備產品 ${productCategory}`,
      actions: [
        {
          type: 'uri',
          label: `確認，繼續報備`,
          uri: `${webUrl}/booking/create?userId=${userId}&productCategory=${productCategory}`
        },
        {
          type: 'uri',
          label: '重新填寫客戶資訊表單',
          uri: `${webUrl}/company/create?userId=${userId}`,
        },
        {
          type: 'postback',
          label: '取消報備',
          data: JSON.stringify({ action: 'booking_cancel' }),
        },
      ]
    }
  };
};

const prepareCustomerInfoByPhotos = () => {
  return {
    type: 'text',
    text: '請使用一般 LINE 對話傳送圖片方式，上傳您的圖片，或拍照傳送出您所要提供的照片!'
  };
};

const sendingCustomerInfoByPhotos = () => {
  return {
    'type': 'template',
    'altText': 'this is a confirm template',
    'template': {
      'type': 'confirm',
      'text': '你已傳送兩張照片，請按下確認按鈕繼續報備，或是取消報備。',
      'actions': [
        {
          type: 'postback',
          label: '確認',
          data: JSON.stringify({ action: 'booking_finish_customer_photo' }),
        },
        {
          type: 'postback',
          label: '取消報備',
          data: JSON.stringify({ action: 'booking_cancel' }),
        }
      ]
    }
  };
};

const errorSendingCustomerInfoByPhotos = () => {
  return {
    'type': 'template',
    'altText': 'this is a confirm template',
    'template': {
      'type': 'buttons',
      'text': '你正在傳送照片狀態，請傳送照片，如果不想繼續請按取消按鈕。',
      'actions': [
        {
          type: 'postback',
          label: '取消報備',
          data: JSON.stringify({ action: 'booking_cancel' }),
        }
      ]
    }
  };
};

const confirmCustomerInfoAfterSendingPhoto = (userId, productCategory) => {
  return {
    type: 'template',
    altText: 'booking template2',
    template: {
      type: 'buttons',
      title: '宇聯科技機器人',
      text: `確認無誤後將繼續報備產品 ${productCategory}`,
      actions: [
        {
          type: 'uri',
          label: `確認，繼續報備`,
          uri: `${webUrl}/booking/create?userId=${userId}&productCategory=${productCategory}`
        },
        {
          type: 'postback',
          label: '重新拍攝客戶名片照片',
          data: JSON.stringify({ action: 'ask_use_photo' }),
        },
        {
          type: 'postback',
          label: '取消報備',
          data: JSON.stringify({ action: 'booking_cancel' }),
        },
      ]
    }
  };
};

const prepareCustomerInfoByText = () => {
  return {
    type: 'text',
    text: '請直接輸入文字'
  };
};

module.exports = {
  apply,
  apply2Ulink,
  apply2Dealer,
  askCustomerInfo,
  confirmCustomerInfo1,
  confirmCustomerInfo2,
  prepareCustomerInfoByPhotos,
  prepareCustomerInfoByText,
  sendingCustomerInfoByPhotos,
  errorSendingCustomerInfoByPhotos,
  confirmCustomerInfoAfterSendingPhoto,
};
