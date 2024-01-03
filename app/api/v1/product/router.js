const express = require('express');
const router = express();
const {
  index,
  find,
  create,
  deleteOne,
  update,
  deleteAll
} = require('./controller');

const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');


router.get('/product', index);
router.get('/product/:id', find);
router.post('/product', authenticateUser, authorizeRoles('admin'), create);
router.delete('/product',  authenticateUser, authorizeRoles('admin'), deleteAll);
router.delete('/product/:id',  authenticateUser, authorizeRoles('admin'), deleteOne);
router.put('/product/:id',  authenticateUser, authorizeRoles('admin'), update);

module.exports = router;
