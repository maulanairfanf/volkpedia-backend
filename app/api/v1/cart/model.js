const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId, 
      required: true,
      ref: "Customer",
    },
    products: [{
      productId: {
        type: mongoose.Types.ObjectId, 
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, 
        default: Number,
      },
    }],
    bill: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
