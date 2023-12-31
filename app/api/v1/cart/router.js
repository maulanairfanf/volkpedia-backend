const express = require('express');
const router = express();
const {
  index,
  create,
  deleteAll,
} = require('./controller');

const { authenticateCustomer } = require('../../../middlewares/auth');


router.get('/cart', authenticateCustomer, index);
router.post('/cart', authenticateCustomer, create);
router.delete('/cart',  authenticateCustomer, deleteAll);

module.exports = router;
