const _ = require('lodash');
const config = require('config');
const { HTTPError, JSONParseError,
  RequestError, ReadError } = require('@line/bot-sdk');

const router = require('express').Router();

const eventRouter = require('../event-router');
const client = require('../../libs/line-client');
const User = require('../../models/user');

const richMenu = config.get('RICH_MENU');

router.get('/webhook', (req, res) => {
  res.json('LINE webhook works');
});

router.post('/webhook', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.json({});

  let events = _.get(req, 'body.events') || [];
  events.forEach(async event => {
    let lineId = _.get(event, 'source.userId');
    let parseUser = await User.current(lineId);

    if (!parseUser) {
      let user = new User();
      user.set('lineId', lineId);
      user.set('type', 'unregister');
      user.set('state', 'unregister');
      parseUser = await user.save();
      console.log(`set richmenu on the new user: ${lineId}`);
      client.linkRichMenuToUser(lineId, richMenu.normal);
    }

    try {
      await eventRouter({ client, event });
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error(error.statusCode, error.statusMessage, error);
        console.error(JSON.stringify(error.originalError.response.data, null, 2));
      } else if (error instanceof JSONParseError) {
        console.error(error.raw, error);
      } else if (error instanceof RequestError) {
        console.error(error.code, error);
      } else if (error instanceof ReadError) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  });
});

module.exports = router;
