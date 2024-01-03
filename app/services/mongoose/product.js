const Product = require('../../api/v1/product/model');

const getProductDetail = async (req) => {
  const result = await Product.findOne({ _id: req.params.id })

  return result
}

const getProduct = async (req) => {
  const result = await Product.find()

  return result
}

const createProduct = async (req) => {
  const result = await Product.create(req.body)

  return result
}

const deleteOneProduct = async (req) => {
  const result = await Product.deleteOne({_id: req.params.id})

  return result
}

const deleteAllProduct = async (req) => {
  const result = await Product.deleteMany({})

  return result
}

const updateProduct = async (req) => {
  const result = await Product.updateOne({_id: req.params.id}, (req.body))

  return result
}

module.exports = {
  getProduct,
  getProductDetail,
  createProduct,
  deleteOneProduct,
  updateProduct,
  deleteAllProduct
};
