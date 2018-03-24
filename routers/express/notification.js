const router = require('express').Router();

router.get('/machine-alert', (req, res) => {
  res.json([]);
});

router.post('/machine-alert', (req, res) => {
  res.json({
    query: req.query,
    body: req.body,
  });
});

module.exports = router;
