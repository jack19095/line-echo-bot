const express = require('express');
const router = express.Router();

const User = require('../../models/user');
const lineClient = require('../../libs/line-client');

router.get('/register', (req, res) => {
  const { type, lineId } = req.query;
  res.render('user-register', {
    type,
    lineId,
  });
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { lineId, type, phone, name, company, email } = req.body;
  let user = await User.current(lineId);
  user.set({
    lineId, type, phone, name, company, email, state: 'pending',
  });
  user = await user.save();
  console.log(user);
  lineClient.pushMessage(lineId, { type: 'text', text: '你已註冊成功' });
  res.send('<html><body><h1>你已成功送出會員申請，請回到 LINE 介面。</h1></body></html>');
});

router.get('/review', async (req, res) => {
  let users = await User.getAll();
  users = users.map(user => user.toJSON());
  console.log(users);
  res.render('generic-table', {
    title: '會員審核',
    data: users,
    keys: ['name', 'company', 'type', 'state'],
    titles: ['姓名', '公司名稱', '身份', '狀態'],
    plugin: 'review',
  });
});

router.get('/review', (req, res) => {
  const { type, lineId } = req.query;
  res.render('user-register', {
    type,
    lineId,
  });
});

router.get('/', async (req, res) => {
  let users = await User.getAll();
  res.json(users);
});

router.get('/:id/', async (req, res) => {
  const { id } = req.params;
  let user = await User.getById(id);
  res.json(user);
});

router.post('/:id/', async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.getById(id);
    user.set(req.body);
    user = await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/current', async (req, res) => {
  const { lineId } = req.query;
  let result;
  try {
    result = await User.current(lineId) || {};
  } catch (error) {
    result = error.message;
    console.error(error);
  }
  res.json(result);
});

module.exports = router;
