const express = require('express')
const router = express()
const {
	index,
	find,
	create,
	deleteOne,
	update,
	deleteAll,
	indexCoba,
} = require('./controller')

const {
	authenticateCustomer,
	authenticateUser,
	authorizeRoles,
} = require('../../../middlewares/auth')

router.get('/product', index)
router.get('/product/coba', indexCoba)
router.get('/product/:id', authenticateCustomer, find)
router.get('/cms/product', authenticateUser, authorizeRoles('admin'), index)
router.get('/cms/product/:id', authenticateUser, authorizeRoles('admin'), find)
router.post('/cms/product', authenticateUser, authorizeRoles('admin'), create)
router.delete(
	'/cms/product',
	authenticateUser,
	authorizeRoles('admin'),
	deleteAll
)
router.delete(
	'/cms/product/:id',
	authenticateUser,
	authorizeRoles('admin'),
	deleteOne
)
router.put(
	'/cms/product/:id',
	authenticateUser,
	authorizeRoles('admin'),
	update
)

module.exports = router
