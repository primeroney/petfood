require('dotenv').config();

const connectDb = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    slug: 'premium-puppy-formula',
    name: 'Premium Puppy Formula',
    tag: 'Bestseller',
    description: 'Complete nutrition for growing pups with DHA for brain development and probiotics for digestive health.',
    price: 34.99,
    oldPrice: 49.99,
    imageKey: 'dog',
    category: 'Dogs',
    stock: 42,
    rating: 5,
    reviews: 127,
    sizes: ['1 lb', '5 lbs', '10 lbs', '20 lbs'],
    ingredients: ['Organic chicken', 'Sweet potato', 'Peas', 'Carrots', 'Blueberry'],
    featured: true
  },
  {
    slug: 'cat-nutrition-blend',
    name: 'Cat Nutrition Blend',
    tag: 'Popular',
    description: 'High-protein recipe for healthy adult cats with taurine and omega fatty acids.',
    price: 28.99,
    imageKey: 'cat',
    category: 'Cats',
    stock: 31,
    rating: 5,
    reviews: 89,
    sizes: ['1 lb', '3 lbs', '6 lbs'],
    ingredients: ['Salmon', 'Chicken meal', 'Pumpkin', 'Taurine'],
    featured: true
  },
  {
    slug: 'organic-senior-mix',
    name: 'Organic Senior Mix',
    tag: 'Premium',
    description: 'Gentle organic formula for mature pets with joint-supporting nutrients.',
    price: 32.99,
    imageKey: 'bone',
    category: 'Dogs',
    stock: 18,
    rating: 4,
    reviews: 56,
    sizes: ['3 lbs', '6 lbs', '12 lbs'],
    ingredients: ['Organic turkey', 'Brown rice', 'Glucosamine', 'Spinach'],
    featured: true
  },
  {
    slug: 'root-veggie-treats',
    name: 'Root Veggie Treats',
    tag: 'New',
    description: 'Crunchy, nutrient-dense vegetable snacks made for training and everyday rewards.',
    price: 12.99,
    imageKey: 'carrot',
    category: 'Treats',
    stock: 64,
    rating: 5,
    reviews: 203,
    sizes: ['8 oz', '1 lb'],
    ingredients: ['Carrot', 'Sweet potato', 'Oat flour', 'Flaxseed'],
    featured: true
  }
];

async function seed() {
  await connectDb();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
