const express = require('express');
const router = express();
const { signinCms, createAdminCms } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/auth/signin', signinCms);
router.post('/auth/admin', authenticateUser, authorizeRoles('owner'), createAdminCms);

module.exports = router;
