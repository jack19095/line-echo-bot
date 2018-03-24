const express = require('express');
const router = express.Router();
const Company = require('../../models/company');

const User = require('../../models/user');

router.get('/create', async(req, res) => {
  const { userId } = req.query;
  res.render('company-create', { userId });
});

router.post('/create', async(req, res) => {
  console.log(req.body, req.query);
  try {
    const { userId } = req.body;
    const parseUser = await User.getById(userId);
    let created = (await Company.createFromForm(req.body)).toJSON();
    await parseUser.setContextObject({
      state: 'COMPANY_CREATE_DONE',
      bookingCompany: created,
    });
    res.send('<html><body><h1>你已成功新建客戶資料，請回到 LINE 介面，並在文字框輸入「完成」。</h1></body></html>');
    console.log(created);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  res.json(await Company.getById(req.params.id));
});

router.get('/', async (req, res) => {
  res.json(await Company.getAll());
});

module.exports = router;
