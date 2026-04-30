const express = require('express');
const {
  listOrders,
  getOrder,
  createOrder,
  checkout,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

router.post('/checkout', checkout);
router.route('/orders').get(listOrders).post(createOrder);
router.route('/orders/:orderNumber').get(getOrder).patch(updateOrderStatus);

module.exports = router;
