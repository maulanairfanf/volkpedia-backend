const express = require('express');
const router = express();
const {
  index,
  find,
  create
} = require('./controller');


router.get('/product', index);
router.get('/product/:id', find);
router.post('/product', create);

module.exports = router;
