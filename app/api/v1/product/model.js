const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name cannot empty'],
    },
    description: {
      type: String,
      required: [true, 'Description cannot empty'],
    },
    price: {
      type: Number,
      required: [true, 'Price cannot empty'],
      default: 0
    },
    stock: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
