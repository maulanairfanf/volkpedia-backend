const express = require('express');
const router = express();
const {
  index,
} = require('./controller');

const {  authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/dashboard', authenticateUser, authorizeRoles('admin'), index);

module.exports = router;
