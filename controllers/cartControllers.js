const Cart = require('../models/Cart')
const Product = require('../models/Products')

module.exports =  {
  getCart: async(req, res) => {
    // Product.findById(req.params.id)
    const user = req.params.id;
    try {
      const cart = await Cart.findOne({user}).
      populate({path: 'Product', select: '_id name'})
      console.log('cart', cart.products)
      if (cart && cart.products.length > 0) {
        res.status(200).send(cart);
      } else {
        res.send(null);
      }
    } catch (error) {
      res.status(500).send();
    }
  },

  addCart: async(req, res) => {
    const user = req.params.id;
    const { productId, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ user });
      const product = await Product.findOne({ _id: productId });

      if (!product) {
        res.status(404).send({ message: "item not found" });
        return;
      }
      // const price = product.price;
      // const name = product.name;

      //If cart already exists for user,
      if (cart) {
        const productIndex = cart.products.findIndex((item) => item.product == product);
        //check if product exists or not

        if (productIndex > -1) {
          let product = cart.products[productIndex];
          product.quantity += quantity;

          // cart.totalPrice = cart.products.reduce((acc, curr) => {
          //     return acc + curr.quantity * curr.price;
          // },0)
          
          cart.products[productIndex] = product;
          await cart.save();
          res.status(200).send(cart);
        } else {
          cart.products.push({ product, quantity });
          // cart.totalPrice = cart.products.reduce((acc, curr) => {
          //     return acc + curr.quantity * curr.price;
          // },0)

          await cart.save();
          res.status(200).send(cart);
        }
      } else {
        //no cart exists, create one
        const newCart = await Cart.create({
          user,
          products: [{ product, quantity }],
          // totalPrice: quantity * price,
        });
        return res.status(201).send(newCart);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  },

  deleteCart: async(req, res) => {
  try {
      await Cart.deleteMany({});
      res.status(200).json({
        success: true,
        msg: 'All cart were deleted'
      });
    } catch (err) {
      throw new Error(`Error deleting cart: ${err.message}`);
    }
  },


  
}