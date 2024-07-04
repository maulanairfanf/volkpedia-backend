const {
	getProduct,
	getProductDetail,
	createProduct,
	deleteOneProduct,
	updateProduct,
	deleteAllProduct,
} = require('../../../services/mongoose/product')

const { StatusCodes } = require('http-status-codes')

const index = async (req, res, next) => {
	try {
		const result = await getProduct(req)

		res.status(StatusCodes.OK).json(result)
	} catch (err) {
		next(err)
	}
}

const indexCoba = async (req, res, next) => {
	try {
		const result = [
			{
				_id: '65b8f58f1a6a6eef414eef13',
				name: 'Chair Sea Color',
				description: 'Make your room like ocean',
				price: 2000000,
				stock: 21,
				image:
					'https://images.unsplash.com/photo-1611967164521-abae8fba4668?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				rating: 4.8,
				selling: 7,
				location: 'Lampung',
				createdAt: '2024-01-30T13:11:43.598Z',
				updatedAt: '2024-07-02T03:28:15.706Z',
				__v: 0,
			},
		]

		res.status(StatusCodes.OK).json(result)
	} catch (err) {
		next(err)
	}
}

const find = async (req, res, next) => {
	try {
		const result = await getProductDetail(req)

		res.status(StatusCodes.OK).json({
			data: result,
		})
	} catch (err) {
		next(err)
	}
}

const create = async (req, res, next) => {
	try {
		const result = await createProduct(req)

		res.status(StatusCodes.CREATED).json({
			data: result,
		})
	} catch (err) {
		next(err)
	}
}

const deleteOne = async (req, res, next) => {
	try {
		const result = await deleteOneProduct(req)

		res.status(StatusCodes.OK).json({
			data: result,
		})
	} catch (err) {
		next(err)
	}
}

const deleteAll = async (req, res, next) => {
	try {
		const result = await deleteAllProduct(req)

		res.status(StatusCodes.OK).json({
			data: result,
		})
	} catch (err) {
		next(err)
	}
}

const update = async (req, res, next) => {
	try {
		const result = await updateProduct(req)

		res.status(StatusCodes.OK).json({
			data: result,
		})
	} catch (err) {
		next(err)
	}
}

module.exports = {
	index,
	find,
	create,
	deleteOne,
	update,
	deleteAll,
	indexCoba,
}
