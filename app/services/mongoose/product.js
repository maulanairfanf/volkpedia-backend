const Product = require('../../api/v1/product/model');

const getProductDetail = async (req) => {
  const result = await Product.findOne({ _id: req.params.id })

  return result
}

const getProduct = async (req) => {
  console.log('req.query', req.query)
  const { query, sortPrice, limit = 10, page = 1 } = req.query;
  let condition = {}

  if (query) {
    condition = { ...condition, name: { $regex: query, $options: 'i' } };
  }

  // if (sortPrice) {
  //   condition = { ...condition, category: category };
  // }

  const result = await Product.find(condition)
  .limit(limit)
  .skip(limit * (page - 1));

  const count = await Product.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count }
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
