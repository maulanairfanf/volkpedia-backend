const express = require('express');
const router = express();
const { signinCms, createAdminCms } = require('./controller');

router.post('/auth/signin', signinCms);
router.post('/auth/admin', createAdminCms);

module.exports = router;
