const router = require('express').Router();
const productController = require('../controllers/productsControllers')
const { isLoggedIn } = require("../controllers/middleware"); // import isLoggedIn custom middleware

router.get('/:limit?', isLoggedIn, productController.getAllProduct)
router.get('/detail/:id', isLoggedIn, productController.getProduct)
router.get('/search/:key', isLoggedIn, productController.searchProduct)
router.post('/', isLoggedIn, productController.createProduct)
router.delete('/:id', isLoggedIn, productController.deleteProduct)
router.put('/:id', isLoggedIn, productController.updateProduct)

module.exports = router