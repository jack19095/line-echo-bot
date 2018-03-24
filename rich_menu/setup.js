const Client = require("@line/bot-sdk").Client;
const fs = require("fs");
const path = require("path");

const CHANNEL_ACCESS_TOKEN = 'tk8lgslkCtY+IcIxxor87nedW89tgh6jG38ib5qWxpGy5GJ25/OFM4SsGKBWYAJMmteTt/htuCLYSYdWiqRcXIhsbDHv/TSl6q35EHxR7U/JNJNx6rWEtrCOS+tTSM4joiDBA46GJB+OfbfBWc9SXgdB04t89/1O/w1cDnyilFU='
const client = new Client({
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: 'f265064ebc5080b131ecd79cef77afc9'
  });

  const richMenu = {
    size: {
      width: 2500,
      height: 1686
    },
    selected: false,
    name: "Controller",
    chatBarText: "Controller",
    areas: [
      {
        bounds: {
          x: 551,
          y: 325,
          width: 321,
          height: 321
        },
        action: {
          type: "message",
          text: "up"
        }
      },
      {
        bounds: {
          x: 876,
          y: 651,
          width: 321,
          height: 321
        },
        action: {
          type: "message",
          text: "right"
        }
      },
      {
        bounds: {
          x: 551,
          y: 972,
          width: 321,
          height: 321
        },
        action: {
          type: "message",
          text: "down"
        }
      },
      {
        bounds: {
          x: 225,
          y: 651,
          width: 321,
          height: 321
        },
        action: {
          type: "message",
          text: "left"
        }
      },
      {
        bounds: {
          x: 1433,
          y: 657,
          width: 367,
          height: 367
        },
        action: {
          type: "message",
          text: "btn b"
        }
      },
      {
        bounds: {
          x: 1907,
          y: 657,
          width: 367,
          height: 367
        },
        action: {
          type: "message",
          text: "btn a"
        }
      }
    ]
  };
  
  async function main() {
    try {
      let richMenus = await client.getRichMenuList();
      for (let richMenu of richMenus) {
        await client.deleteRichMenu(richMenu.richMenuId);
      }
  
      let richMenuId = await client.createRichMenu(richMenu);
      let result = await client.setRichMenuImage(
        richMenuId,
        fs.createReadStream(
            path.resolve(__dirname,'controller-rich-menu.jpg')
        )
      );
  
      console.log(richMenuId, result);
    } catch (error) {
      console.log(error);
    }
  }
  
  main();  