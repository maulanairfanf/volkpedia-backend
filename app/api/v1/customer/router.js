const express = require('express');
const router = express();
const {
  signup,
  activeCustomer,
  signin,
  // getAllLandingPage,
  // getDetailLandingPage,
  // getDashboard,
  // checkout,
  // getAllPayment,
} = require('./controller');

const { authenticateCustomer } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/auth/active', activeCustomer);
// router.get('/events', getAllLandingPage);
// router.get('/events/:id', getDetailLandingPage);
// router.get('/payments/:organizer', authenticateCustomer, getAllPayment);
// router.get('/orders', authenticateCustomer, getDashboard);
// router.post('/checkout', authenticateCustomer, checkout);

module.exports = router;
