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
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0,
    },
    selling: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      enum: ["Jakarta", "Bandung", "Lampung"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
