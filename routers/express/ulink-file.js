const express = require('express');
const router = express.Router();
const UlinkFile = require('../../models/ulink-file');

router.get('/:id', async (req, res) => {
  res.json(await UlinkFile.getById(req.params.id));
});

router.get('/', async (req, res) => {
  res.json(await UlinkFile.getAll());
});

module.exports = router;
