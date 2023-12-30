const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const CartSchema = new mongoose.Schema({
  user: { type: ObjectID, required: true, ref: 'User' },
  products: [{
    product: {
      type: ObjectID,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    // totalPrice: Number
  }],

}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema); 
