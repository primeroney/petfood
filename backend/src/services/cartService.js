const Cart = require('../models/Cart');
const Product = require('../models/Product');
const money = require('../utils/money');

const TAX_RATE = 0.08;
const FREE_SHIPPING_MINIMUM = 50;
const STANDARD_SHIPPING = 6.99;

async function getOrCreateCart(sessionId) {
  let cart = await Cart.findOne({ sessionId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
    cart = await cart.populate('items.product');
  }

  return cart;
}

function buildCartResponse(cart) {
  const items = cart.items
    .filter((item) => item.product)
    .map((item) => {
      const lineTotal = money(item.product.price * item.quantity);

      return {
        productId: item.product._id,
        slug: item.product.slug,
        name: item.product.name,
        imageKey: item.product.imageKey,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        lineTotal
      };
    });

  const subtotal = money(items.reduce((sum, item) => sum + item.lineTotal, 0));
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MINIMUM ? 0 : STANDARD_SHIPPING;
  const tax = money(subtotal * TAX_RATE);

  return {
    id: cart._id,
    sessionId: cart.sessionId,
    items,
    totals: {
      subtotal,
      shipping: money(shipping),
      tax,
      total: money(subtotal + shipping + tax)
    },
    updatedAt: cart.updatedAt
  };
}

async function addItem(sessionId, productId, quantity = 1, size = '') {
  if (!productId) {
    const error = new Error('Product id is required.');
    error.statusCode = 400;
    throw error;
  }

  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  if (product.stock < quantity) {
    const error = new Error('Not enough product in stock.');
    error.statusCode = 400;
    throw error;
  }

  const cart = await getOrCreateCart(sessionId);
  const item = cart.items.find((entry) => {
    return entry.product && entry.product._id.toString() === productId && entry.size === size;
  });

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ product: product._id, quantity, size });
  }

  await cart.save();
  await cart.populate('items.product');
  return buildCartResponse(cart);
}

module.exports = {
  getOrCreateCart,
  buildCartResponse,
  addItem
};
