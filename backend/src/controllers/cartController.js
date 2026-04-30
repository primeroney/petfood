const { randomUUID } = require('crypto');
const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');
const { getOrCreateCart, buildCartResponse, addItem } = require('../services/cartService');

function getSessionId(req) {
  return req.get('x-session-id') || req.body.sessionId || randomUUID();
}

const getCart = asyncHandler(async (req, res) => {
  const sessionId = req.get('x-session-id') || req.query.sessionId || randomUUID();
  const cart = await getOrCreateCart(sessionId);
  res.json(buildCartResponse(cart));
});

const addCartItem = asyncHandler(async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId, quantity = 1, size = '' } = req.body;
  const cart = await addItem(sessionId, productId, Number(quantity), size);
  res.status(201).json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const sessionId = getSessionId(req);
  const cart = await getOrCreateCart(sessionId);
  const item = cart.items.find((entry) => entry.product._id.toString() === req.params.productId);

  if (!item) {
    res.status(404);
    throw new Error('Cart item not found.');
  }

  item.quantity = Math.max(1, Number(req.body.quantity || 1));
  await cart.save();
  await cart.populate('items.product');
  res.json(buildCartResponse(cart));
});

const removeCartItem = asyncHandler(async (req, res) => {
  const sessionId = req.get('x-session-id') || req.query.sessionId || randomUUID();
  const cart = await getOrCreateCart(sessionId);

  cart.items = cart.items.filter((entry) => entry.product._id.toString() !== req.params.productId);
  await cart.save();
  await cart.populate('items.product');

  res.json(buildCartResponse(cart));
});

const clearCart = asyncHandler(async (req, res) => {
  const sessionId = req.get('x-session-id') || req.query.sessionId || randomUUID();
  const cart = await Cart.findOneAndUpdate(
    { sessionId },
    { items: [] },
    { new: true }
  ).populate('items.product');

  res.json(buildCartResponse(cart || { sessionId, items: [] }));
});

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart
};
