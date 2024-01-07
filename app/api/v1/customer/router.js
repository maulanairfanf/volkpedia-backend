const express = require('express');
const router = express();
const {
  signup,
  activeCustomer,
  signin,
  getProfile,
  getCustomer
  // getAllLandingPage,
  // getDetailLandingPage,
  // getDashboard,
  // checkout,
  // getAllPayment,
} = require('./controller');

const { authenticateCustomer, authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/auth/active', activeCustomer);
router.get('/me', authenticateCustomer, getProfile);
router.get('/customer', authenticateUser, authorizeRoles('admin'), getCustomer);

// router.get('/events', getAllLandingPage);
// router.get('/events/:id', getDetailLandingPage);
// router.get('/payments/:organizer', authenticateCustomer, getAllPayment);
// router.get('/orders', authenticateCustomer, getDashboard);
// router.post('/checkout', authenticateCustomer, checkout);

module.exports = router;
