const Customer = require('../../api/v1/customer/model');
const Product = require('../../api/v1/product/model');
const Cart = require('../../api/v1/cart/model');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');


const getCart = async (req) => {
  const cart = await Cart.findOne({ customer: req.customer.id })
  .populate({
    path: "products.productId", select: '_id name description image price location'
  })

  if (cart) {
    const results = cart.products
    const temp =  results.filter((item) => item.productId != null)
    cart.products = temp
    cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    },0)
    cart.save()
  } else {
    return []
  }
  return cart
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

  if (product.stock < quantity) {
    throw new BadRequestError('Quantity More Than Stock Product')
  }

  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex((product) => product.productId ==  productId);
    //check if product exists or not
    if (productIndex > -1) {
      let temp = cart.products[productIndex];
      temp.quantity += quantity;
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      },0)
      cart.products[productIndex] = temp;
      await cart.save();
    } else {
      cart.products.push({ productId, quantity, price });
      cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
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

  product.stock -= quantity
  await product.save();
  console.log('cart', cart)
  return cart
}

const deleteProductCart = async (req) => {
  const customer = req.customer.id;
  const cart = await Cart.findOne({ customer: customer });
  const product = await Product.findOne({ _id: req.params.id });

  if (cart) {
    const productIndex = cart.products.findIndex((product) => product.productId ==  req.params.id);
    //check if product exists or not
    if (productIndex > -1) {
      product.stock += cart.products[productIndex].quantity
      cart.products.splice(productIndex, 1)
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      },0)
      await cart.save();
      await product.save();
    }
  }
  return cart
}

const deleteAllCart = async (req) => {
  const result = Cart.deleteMany({})

  return result
}

const deleteOneByUser = async (req) => {
  const customer = req.customer.id;
  const result = Cart.deleteOne({customer: customer})

  return result
}


module.exports = {
  getCart,
  createCart,
  deleteAllCart,
  deleteOneByUser,
  deleteProductCart
};
