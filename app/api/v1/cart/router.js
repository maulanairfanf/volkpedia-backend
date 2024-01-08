const express = require('express');
const router = express();
const {
  index,
  create,
  deleteAll,
  deleteUserCart,
  deleteProductCartUser,
  getAll
} = require('./controller');

const { authenticateCustomer, authenticateUser, authorizeRoles } = require('../../../middlewares/auth');


router.get('/cart', authenticateCustomer, index);
router.post('/cart', authenticateCustomer, create);
router.delete('/cart/clean',  authenticateCustomer, deleteAll);
router.delete('/cart',  authenticateCustomer, deleteUserCart);
router.delete('/cart/:id',  authenticateCustomer, deleteProductCartUser);
router.get('/cms/cart',  authenticateUser, authorizeRoles('admin'), getAll);

module.exports = router;
