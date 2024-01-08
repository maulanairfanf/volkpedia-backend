const Users = require('../../api/v1/users/model');
const Customers = require('../../api/v1/customer/model');
const Product = require('../../api/v1/product/model');
const Cart = require('../../api/v1/cart/model');

const { BadRequestError, UnauthorizedError } = require('../../errors');

const getDashboard = async (req) => {
  const countCustomer = await Customers.countDocuments()
  const countProduct = await Product.countDocuments()
  const countCart = await Cart.countDocuments()
  const product = await Product.find().limit(5).sort({createdAt: -1})


  return { product: product, countCustomer: countCustomer, countProduct: countProduct, countCart: countCart, countOrder: 0 }
};


module.exports = { getDashboard };
