const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const listProducts = asyncHandler(async (req, res) => {
  const { category, q, featured } = req.query;
  const filter = {};

  if (category) filter.category = new RegExp(`^${category}$`, 'i');
  if (featured === 'true') filter.featured = true;
  if (q) {
    filter.$or = [
      { name: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { category: new RegExp(q, 'i') }
    ];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  res.json({ message: 'Product deleted.' });
});

const listCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories.sort());
});

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories
};
