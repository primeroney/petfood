const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    tag: {
      type: String,
      default: 'New'
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    oldPrice: {
      type: Number,
      default: null
    },
    imageKey: {
      type: String,
      default: 'product'
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0
    },
    sizes: {
      type: [String],
      default: []
    },
    ingredients: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
