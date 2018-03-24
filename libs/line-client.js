
const config = require('config');
const { Client } = require('@line/bot-sdk');

const CONFIG = {
  channelAccessToken: config.get('CHANNEL_ACCESS_TOKEN'),
  channelSecret: config.get('CHANNEL_SECRET')
};

/**
 * @type {Client}
 * @module Client
 */

module.exports = new Client(CONFIG);
