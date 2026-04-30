const express = require('express');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories
} = require('../controllers/productController');

const router = express.Router();

router.get('/categories', listCategories);
router.route('/products').get(listProducts).post(createProduct);
router.route('/products/:slug').get(getProduct).patch(updateProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
