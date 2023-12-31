const Customer = require('../../api/v1/customer/model');
const Product = require('../../api/v1/product/model');
const Cart = require('../../api/v1/cart/model');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');


const getCart = async (req) => {
  const customer = await Cart.findOne({ customer: req.customer.id })
  .populate({
    path: "products.productId", select: '_id name description image price location'
  })

  return customer
};


const createCart = async (req) => {
  const { productId, quantity } = req.body;
  const customer = req.customer.id;
  const cart = await Cart.findOne({ customer: customer });
  const product = await Product.findOne({ _id: productId });

  if (!product) {
      throw new BadRequestError('Product not found')
  }
  const price = product.price;

  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex((product) => product.productId ==  productId);
    //check if product exists or not
    if (productIndex > -1) {
      let temp = cart.products[productIndex];
      temp.quantity += quantity;
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * price;
      },0)
      cart.products[productIndex] = temp;
      await cart.save();
    } else {
      cart.products.push({ productId, quantity, price });
      cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * price;
      },0)
      await cart.save();
    }
  } else {
    //no cart exists, create one
    await Cart.create({
      customer,
      products: [{ productId, quantity, price }],
      bill: quantity * price,
    });

  }
  
  return cart;
}

const deleteAllCart = async (req) => {
  const result = Cart.deleteMany({})

  return result
}


module.exports = {
  getCart,
  createCart,
  deleteAllCart
};
