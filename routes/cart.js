const router = require('express').Router();
const cartController = require('../controllers/cartControllers')
const { isLoggedIn } = require("../controllers/middleware"); // import isLoggedIn custom middleware

router.get('/:id', isLoggedIn, cartController.getCart)
router.post('/:id', isLoggedIn, cartController.addCart)


module.exports = router