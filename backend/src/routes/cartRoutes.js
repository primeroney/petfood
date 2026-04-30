const express = require('express');
const {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();

router.route('/cart').get(getCart).post(addCartItem).delete(clearCart);
router.route('/cart/items/:productId').patch(updateCartItem).put(updateCartItem).delete(removeCartItem);

module.exports = router;
