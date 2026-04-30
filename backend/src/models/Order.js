const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    slug: String,
    price: Number,
    quantity: Number,
    size: String,
    lineTotal: Number
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    sessionId: String,
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    items: [orderItemSchema],
    totals: {
      subtotal: Number,
      shipping: Number,
      tax: Number,
      total: Number
    },
    shippingMethod: {
      type: String,
      default: 'standard'
    },
    status: {
      type: String,
      enum: ['received', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'received'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
