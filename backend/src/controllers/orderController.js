const { randomUUID } = require('crypto');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { getOrCreateCart, buildCartResponse } = require('../services/cartService');

function validateCustomer(customer = {}) {
  const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'postalCode', 'country'];
  const missing = required.filter((field) => !customer[field]);

  if (missing.length > 0) {
    const error = new Error(`Missing checkout fields: ${missing.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }
}

function makeOrderNumber() {
  return `PV-${Date.now()}`;
}

const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber });

  if (!order) {
    res.status(404);
    throw new Error('Order not found.');
  }

  res.json(order);
});

const createOrder = asyncHandler(async (req, res) => {
  validateCustomer(req.body.customer);

  const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];

  if (requestedItems.length === 0) {
    res.status(400);
    throw new Error('Order must include at least one item.');
  }

  const products = await Product.find({ _id: { $in: requestedItems.map((item) => item.productId) } });
  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  const items = requestedItems.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) throw new Error('Order contains an invalid product.');

    const quantity = Math.max(1, Number(item.quantity || 1));
    const lineTotal = Number((product.price * quantity).toFixed(2));

    return {
      product: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity,
      size: item.size || '',
      lineTotal
    };
  });

  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const shipping = subtotal >= 50 ? 0 : 6.99;
  const tax = Number((subtotal * 0.08).toFixed(2));

  const order = await Order.create({
    orderNumber: makeOrderNumber(),
    sessionId: req.body.sessionId || randomUUID(),
    customer: req.body.customer,
    items,
    totals: {
      subtotal,
      shipping,
      tax,
      total: Number((subtotal + shipping + tax).toFixed(2))
    },
    shippingMethod: req.body.shippingMethod || 'standard'
  });

  res.status(201).json(order);
});

const checkout = asyncHandler(async (req, res) => {
  validateCustomer(req.body.customer);

  const sessionId = req.get('x-session-id') || req.body.sessionId;
  const cart = await getOrCreateCart(sessionId);
  const pricedCart = buildCartResponse(cart);

  if (pricedCart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty.');
  }

  const order = await Order.create({
    orderNumber: makeOrderNumber(),
    sessionId,
    customer: req.body.customer,
    items: pricedCart.items.map((item) => ({
      product: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      lineTotal: item.lineTotal
    })),
    totals: pricedCart.totals,
    shippingMethod: req.body.shippingMethod || 'standard'
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({
    order,
    cart: buildCartResponse(cart)
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { orderNumber: req.params.orderNumber },
    {
      status: req.body.status,
      paymentStatus: req.body.paymentStatus
    },
    { new: true, runValidators: true }
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found.');
  }

  res.json(order);
});

module.exports = {
  listOrders,
  getOrder,
  createOrder,
  checkout,
  updateOrderStatus
};
