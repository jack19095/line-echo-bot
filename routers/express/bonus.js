const express = require('express');
const router = express.Router();

router.get('/review', (req, res) => {
  res.render('generic-table', {
    data: [{
      username: '王大明',
      customer: '大縱電腦',
      bonusType: '郵政禮卷',
      priceOrNumber: '3000',
      reviewedDate: '待審核',
    }],
    keys: ['username', 'customer', 'bonusType', 'priceOrNumber', 'reviewedDate'],
    titles: ['姓名', '公司名稱', '紅利類型', '金額或數量', '審核日'],
  });
});

router.get('/summary', (req, res) => {
  res.render('bonus', {
    data: [],
    keys: ['name', 'productCategory', 'state', 'bonus', 'releaseDay'],
    titles: ['客戶名稱', '品牌', '狀態', '紅利', '發放日']
  });
});

module.exports = router;
