const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const CartSchema = new mongoose.Schema({
  user: { type: ObjectID, required: true, ref: 'User' },
  products: [{
    productId: {
      type: ObjectID,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: Number
  }],

}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema); 
