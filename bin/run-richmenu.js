const config = require('config');
const fs = require('fs');
const path = require('path');
const { Client } = require('@line/bot-sdk');

const CONFIG = {
  channelAccessToken: config.get('CHANNEL_ACCESS_TOKEN'),
  channelSecret: config.get('CHANNEL_SECRET')
};
const client = new Client(CONFIG);

const create = async () => {
  let normalRichMenuId = await client.createRichMenu({
    size: { width: 2500, height: 1686 },
    selected: true,
    name: '一般會員功能頁',
    chatBarText: '一般會員功能頁',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '申請報修'
        },
      },
      {
        bounds: {
          x: 2500 / 2,
          y: 0,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '課程與活動'
        },
      },
      {
        bounds: {
          x: 0,
          y: (1686 - 45) / 2,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '免費試用'
        },
      },
      {
        bounds: {
          x: 2500 / 2,
          y: (1686 - 45) / 2,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '檔案下載'
        },
      },
    ]
  });
  await client.setRichMenuImage(
    normalRichMenuId,
    fs.createReadStream(path.resolve(__dirname, 'images/normal.png'))
  );
  let ulinkRichMenuId = await client.createRichMenu({
    size: { width: 2500, height: 1686 },
    selected: true,
    name: '宇聯員工功能頁',
    chatBarText: '宇聯員工功能頁',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '報備處理'
        },
      },
      {
        bounds: {
          x: 2500 / 3,
          y: 0,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '報修處理'
        },
      },
      {
        bounds: {
          x: 2500 / 3 * 2,
          y: 0,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '試用審核'
        },
      },
      {
        bounds: {
          x: 0,
          y: (1686 - 45) / 2,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '課程與活動'
        },
      },
      {
        bounds: {
          x: 2500 / 3,
          y: (1686 - 45) / 2,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '檔案下載'
        },
      },
      {
        bounds: {
          x: 2500 / 3 * 2,
          y: (1686 - 45) / 2,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '確認審核'
        },
      },
    ]
  });
  await client.setRichMenuImage(
    ulinkRichMenuId,
    fs.createReadStream(path.resolve(__dirname, 'images/ulink.png'))
  );
  let dealerRichMenuId = await client.createRichMenu({
    size: { width: 2500, height: 1686 },
    selected: true,
    name: '經銷商功能頁',
    chatBarText: '經銷商功能頁',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '申請報備'
        },
      },
      {
        bounds: {
          x: 2500 / 3,
          y: 0,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '申請報修'
        },
      },
      {
        bounds: {
          x: 2500 / 3 * 2,
          y: 0,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '試用申請'
        },
      },
      {
        bounds: {
          x: 0,
          y: (1686 - 45) / 2,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '課程與活動'
        },
      },
      {
        bounds: {
          x: 2500 / 3,
          y: (1686 - 45) / 2,
          width: 2500 / 3,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '檔案下載'
        },
      },
      {
        bounds: {
          x: 2500 / 3 * 2,
          y: (1686 - 45) / 2,
          width: 2500 / 2,
          height: (1686 - 45) / 2,
        },
        action: {
          type: 'message',
          text: '紅利查詢'
        },
      },
    ]
  });
  await client.setRichMenuImage(
    dealerRichMenuId,
    fs.createReadStream(path.resolve(__dirname, 'images/dealer.png'))
  );

  console.log({
    normalRichMenuId,
    ulinkRichMenuId,
    dealerRichMenuId,
  });
};

const clear = async() => {
  let richMenus = await client.getRichMenuList();
  let promises = richMenus.map((menu) => {
    return client.deleteRichMenu(menu.richMenuId);
  });
  return Promise.all(promises);
};

const get = async() => {
  let richMenus = await client.getRichMenuList();
  console.log(richMenus);
  return richMenus;
};

/**
 * Usage: $ node bin/run-richmenu.js create
 */

if (require && require.main === module) {
  let arg = process.argv[2];
  switch (arg) {
  case 'create':
    create().catch(console.error);
    break;
  case 'clear':
    clear().catch(console.error);
    break;
  case 'get':
    get().catch(console.error);
    break;
  default:
    console.log(`arg = ${arg}, using default option: create`);
    create().catch(console.error);
  }
}
