const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('order', {});
});

router.post('/:id', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
