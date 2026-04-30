const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const TAX_RATE = 0.08;
const FREE_SHIPPING_MINIMUM = 50;
const STANDARD_SHIPPING = 6.99;

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const DATA_FILES = {
  products: 'products.json',
  carts: 'carts.json',
  orders: 'orders.json',
  newsletter: 'newsletter.json'
};

function now() {
  return new Date().toISOString();
}

function money(value) {
  return Number(Number(value || 0).toFixed(2));
}

function parseCookies(header = '') {
  return header.split(';').reduce((cookies, cookie) => {
    const [name, ...rest] = cookie.trim().split('=');
    if (!name) return cookies;
    cookies[name] = decodeURIComponent(rest.join('='));
    return cookies;
  }, {});
}

function getSessionId(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies.petvital_session || null;
}

function makeSessionCookie(sessionId) {
  return `petvital_session=${encodeURIComponent(sessionId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extraHeaders
  });
  res.end(JSON.stringify(data, null, 2));
}

function sendError(res, statusCode, message, details = undefined) {
  sendJson(res, statusCode, {
    error: message,
    ...(details ? { details } : {})
  });
}

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  await Promise.all(
    Object.values(DATA_FILES).map(async (fileName) => {
      const filePath = path.join(DATA_DIR, fileName);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, '[]\n', 'utf8');
      }
    })
  );
}

async function readJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  const contents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(contents || '[]');
}

async function writeJson(fileName, value) {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function readBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) {
      const error = new Error('Request body is too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Request body must be valid JSON.');
    error.statusCode = 400;
    throw error;
  }
}

function routeParts(url) {
  return url.pathname.split('/').filter(Boolean);
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeQuantity(value, fallback = 1) {
  const quantity = Number(value || fallback);
  if (!Number.isInteger(quantity) || quantity < 1) {
    const error = new Error('Quantity must be a positive whole number.');
    error.statusCode = 400;
    throw error;
  }
  return quantity;
}

function publicProduct(product) {
  return {
    id: product.id,
    name: product.name,
    tag: product.tag,
    description: product.description,
    price: product.price,
    oldPrice: product.oldPrice,
    image: product.image,
    category: product.category,
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    sizes: product.sizes
  };
}

function filterProducts(products, url) {
  const category = url.searchParams.get('category');
  const query = url.searchParams.get('q')?.toLowerCase();
  const limit = Number(url.searchParams.get('limit') || products.length);

  let result = products;

  if (category) {
    result = result.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    result = result.filter((product) => {
      return [product.name, product.description, product.category, product.tag]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }

  return result.slice(0, Number.isFinite(limit) && limit > 0 ? limit : products.length);
}

function calculateCart(cart, products) {
  const items = cart.items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return null;

      const quantity = normalizeQuantity(item.quantity);
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        lineTotal: money(product.price * quantity)
      };
    })
    .filter(Boolean);

  const subtotal = money(items.reduce((sum, item) => sum + item.lineTotal, 0));
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MINIMUM ? 0 : STANDARD_SHIPPING;
  const tax = money(subtotal * TAX_RATE);
  const total = money(subtotal + shipping + tax);

  return {
    ...cart,
    items,
    totals: {
      subtotal,
      shipping: money(shipping),
      tax,
      total
    }
  };
}

async function getOrCreateCart(req, preferredSessionId = null) {
  const products = await readJson(DATA_FILES.products);
  const carts = await readJson(DATA_FILES.carts);
  const sessionId = preferredSessionId || getSessionId(req) || randomUUID();
  let cart = carts.find((entry) => entry.sessionId === sessionId);
  let created = false;

  if (!cart) {
    created = true;
    cart = {
      id: randomUUID(),
      sessionId,
      items: [],
      createdAt: now(),
      updatedAt: now()
    };
    carts.push(cart);
    await writeJson(DATA_FILES.carts, carts);
  }

  return {
    cart,
    carts,
    products,
    created,
    sessionId
  };
}

async function saveCart(carts, cart) {
  cart.updatedAt = now();
  const index = carts.findIndex((entry) => entry.id === cart.id);
  if (index >= 0) carts[index] = cart;
  await writeJson(DATA_FILES.carts, carts);
}

function validateCustomer(customer = {}) {
  const errors = [];

  if (!customer.firstName) errors.push('First name is required.');
  if (!customer.lastName) errors.push('Last name is required.');
  if (!isEmail(customer.email)) errors.push('A valid email address is required.');
  if (!customer.address) errors.push('Street address is required.');
  if (!customer.city) errors.push('City is required.');
  if (!customer.state) errors.push('State is required.');
  if (!customer.postalCode) errors.push('Postal code is required.');
  if (!customer.country) errors.push('Country is required.');

  if (errors.length > 0) {
    const error = new Error('Checkout validation failed.');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }
}

async function handleProducts(req, res, url, parts) {
  const products = await readJson(DATA_FILES.products);

  if (req.method === 'GET' && parts.length === 2) {
    return sendJson(res, 200, filterProducts(products, url).map(publicProduct));
  }

  if (req.method === 'GET' && parts.length === 3) {
    const product = products.find((item) => item.id === decodeURIComponent(parts[2]));
    if (!product) return sendError(res, 404, 'Product not found.');
    return sendJson(res, 200, publicProduct(product));
  }

  if (req.method === 'POST' && parts.length === 2) {
    const body = await readBody(req);

    if (!body.name || !body.price) {
      return sendError(res, 400, 'Product name and price are required.');
    }

    const product = {
      id: body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name: body.name,
      tag: body.tag || 'New',
      description: body.description || '',
      price: money(body.price),
      oldPrice: body.oldPrice ? money(body.oldPrice) : null,
      image: body.image || 'product',
      category: body.category || 'General',
      stock: Number(body.stock || 0),
      rating: Number(body.rating || 0),
      reviews: Number(body.reviews || 0),
      sizes: Array.isArray(body.sizes) ? body.sizes : []
    };

    if (products.some((item) => item.id === product.id)) {
      return sendError(res, 409, 'A product with this id already exists.');
    }

    products.push(product);
    await writeJson(DATA_FILES.products, products);
    return sendJson(res, 201, publicProduct(product));
  }

  if ((req.method === 'PUT' || req.method === 'PATCH') && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    const body = await readBody(req);
    const index = products.findIndex((item) => item.id === id);

    if (index < 0) return sendError(res, 404, 'Product not found.');

    const updated = {
      ...products[index],
      ...body,
      id,
      price: body.price === undefined ? products[index].price : money(body.price),
      oldPrice: body.oldPrice === undefined ? products[index].oldPrice : body.oldPrice ? money(body.oldPrice) : null
    };

    products[index] = updated;
    await writeJson(DATA_FILES.products, products);
    return sendJson(res, 200, publicProduct(updated));
  }

  if (req.method === 'DELETE' && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    const remaining = products.filter((item) => item.id !== id);

    if (remaining.length === products.length) return sendError(res, 404, 'Product not found.');

    await writeJson(DATA_FILES.products, remaining);
    return sendJson(res, 200, { message: 'Product deleted.' });
  }

  return sendError(res, 405, 'Method not allowed for products route.');
}

async function handleCategories(req, res) {
  if (req.method !== 'GET') return sendError(res, 405, 'Method not allowed for categories route.');

  const products = await readJson(DATA_FILES.products);
  const categories = [...new Set(products.map((product) => product.category))].sort();
  return sendJson(res, 200, categories);
}

async function handleCart(req, res, parts) {
  const body = ['POST', 'PATCH', 'PUT'].includes(req.method) ? await readBody(req) : {};
  const preferredSessionId = body.sessionId || null;
  const { cart, carts, products, created, sessionId } = await getOrCreateCart(req, preferredSessionId);
  const headers = created ? { 'Set-Cookie': makeSessionCookie(sessionId) } : {};

  if (req.method === 'GET' && parts.length === 2) {
    return sendJson(res, 200, calculateCart(cart, products), headers);
  }

  if (req.method === 'POST' && parts.length === 2) {
    const productId = body.productId;
    const quantity = normalizeQuantity(body.quantity || 1);
    const product = products.find((item) => item.id === productId);

    if (!product) return sendError(res, 404, 'Product not found.');
    if (product.stock < quantity) return sendError(res, 400, 'Not enough product in stock.');

    const existing = cart.items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await saveCart(carts, cart);
    return sendJson(res, 201, {
      message: 'Item added to cart.',
      cart: calculateCart(cart, products)
    }, headers);
  }

  if ((req.method === 'PATCH' || req.method === 'PUT') && parts.length === 4 && parts[2] === 'items') {
    const productId = decodeURIComponent(parts[3]);
    const quantity = normalizeQuantity(body.quantity);
    const item = cart.items.find((entry) => entry.productId === productId);

    if (!item) return sendError(res, 404, 'Cart item not found.');

    item.quantity = quantity;
    await saveCart(carts, cart);
    return sendJson(res, 200, {
      message: 'Cart item updated.',
      cart: calculateCart(cart, products)
    }, headers);
  }

  if (req.method === 'DELETE' && parts.length === 4 && parts[2] === 'items') {
    const productId = decodeURIComponent(parts[3]);
    const beforeCount = cart.items.length;
    cart.items = cart.items.filter((entry) => entry.productId !== productId);

    if (cart.items.length === beforeCount) return sendError(res, 404, 'Cart item not found.');

    await saveCart(carts, cart);
    return sendJson(res, 200, {
      message: 'Cart item removed.',
      cart: calculateCart(cart, products)
    }, headers);
  }

  if (req.method === 'DELETE' && parts.length === 2) {
    cart.items = [];
    await saveCart(carts, cart);
    return sendJson(res, 200, {
      message: 'Cart cleared.',
      cart: calculateCart(cart, products)
    }, headers);
  }

  return sendError(res, 405, 'Method not allowed for cart route.');
}

async function handleNewsletter(req, res, parts) {
  const subscribers = await readJson(DATA_FILES.newsletter);

  if (req.method === 'GET' && parts.length === 2) {
    return sendJson(res, 200, subscribers);
  }

  if (req.method === 'POST' && parts.length === 2) {
    const body = await readBody(req);

    if (!isEmail(body.email)) {
      return sendError(res, 400, 'A valid email address is required.');
    }

    const email = body.email.trim().toLowerCase();
    const existing = subscribers.find((subscriber) => subscriber.email === email);

    if (existing) {
      return sendJson(res, 200, {
        message: 'Email is already subscribed.',
        subscriber: existing
      });
    }

    const subscriber = {
      id: randomUUID(),
      email,
      source: body.source || 'website',
      createdAt: now()
    };

    subscribers.push(subscriber);
    await writeJson(DATA_FILES.newsletter, subscribers);

    return sendJson(res, 201, {
      message: 'Newsletter subscription saved.',
      subscriber
    });
  }

  if (req.method === 'DELETE' && parts.length === 3) {
    const email = decodeURIComponent(parts[2]).toLowerCase();
    const remaining = subscribers.filter((subscriber) => subscriber.email !== email);

    if (remaining.length === subscribers.length) return sendError(res, 404, 'Subscriber not found.');

    await writeJson(DATA_FILES.newsletter, remaining);
    return sendJson(res, 200, { message: 'Subscriber removed.' });
  }

  return sendError(res, 405, 'Method not allowed for newsletter route.');
}

async function handleOrders(req, res, parts) {
  const orders = await readJson(DATA_FILES.orders);

  if (req.method === 'GET' && parts.length === 2) {
    return sendJson(res, 200, orders);
  }

  if (req.method === 'GET' && parts.length === 3) {
    const order = orders.find((entry) => entry.id === decodeURIComponent(parts[2]));
    if (!order) return sendError(res, 404, 'Order not found.');
    return sendJson(res, 200, order);
  }

  if (req.method === 'POST' && parts.length === 2) {
    const body = await readBody(req);
    const products = await readJson(DATA_FILES.products);
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) return sendError(res, 400, 'Order must include at least one item.');

    const cart = {
      id: randomUUID(),
      sessionId: body.sessionId || randomUUID(),
      items: items.map((item) => ({
        productId: item.productId,
        quantity: normalizeQuantity(item.quantity)
      }))
    };
    const pricedCart = calculateCart(cart, products);

    const order = {
      id: `PV-${Date.now()}`,
      customer: body.customer || {},
      items: pricedCart.items,
      totals: pricedCart.totals,
      status: 'received',
      paymentStatus: 'pending',
      shippingMethod: body.shippingMethod || 'standard',
      createdAt: now()
    };

    orders.push(order);
    await writeJson(DATA_FILES.orders, orders);

    return sendJson(res, 201, {
      message: 'Order received.',
      order
    });
  }

  if (req.method === 'PATCH' && parts.length === 3) {
    const body = await readBody(req);
    const id = decodeURIComponent(parts[2]);
    const index = orders.findIndex((entry) => entry.id === id);

    if (index < 0) return sendError(res, 404, 'Order not found.');

    orders[index] = {
      ...orders[index],
      status: body.status || orders[index].status,
      paymentStatus: body.paymentStatus || orders[index].paymentStatus,
      updatedAt: now()
    };

    await writeJson(DATA_FILES.orders, orders);
    return sendJson(res, 200, orders[index]);
  }

  return sendError(res, 405, 'Method not allowed for orders route.');
}

async function handleCheckout(req, res) {
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed for checkout route.');

  const body = await readBody(req);
  validateCustomer(body.customer);

  const { cart, carts, products, sessionId } = await getOrCreateCart(req, body.sessionId);
  const pricedCart = calculateCart(cart, products);

  if (pricedCart.items.length === 0) {
    return sendError(res, 400, 'Cart is empty.');
  }

  const orders = await readJson(DATA_FILES.orders);
  const order = {
    id: `PV-${Date.now()}`,
    sessionId,
    customer: body.customer,
    items: pricedCart.items,
    totals: pricedCart.totals,
    status: 'received',
    paymentStatus: 'pending',
    shippingMethod: body.shippingMethod || 'standard',
    createdAt: now()
  };

  orders.push(order);
  cart.items = [];

  await Promise.all([
    writeJson(DATA_FILES.orders, orders),
    saveCart(carts, cart)
  ]);

  return sendJson(res, 201, {
    message: 'Checkout complete.',
    order,
    cart: calculateCart(cart, products)
  }, {
    'Set-Cookie': makeSessionCookie(sessionId)
  });
}

async function handleContact(req, res) {
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed for contact route.');

  const body = await readBody(req);
  if (!body.name || !isEmail(body.email) || !body.message) {
    return sendError(res, 400, 'Name, valid email, and message are required.');
  }

  return sendJson(res, 201, {
    message: 'Contact message received.',
    ticket: {
      id: `MSG-${Date.now()}`,
      name: body.name,
      email: body.email,
      createdAt: now()
    }
  });
}

async function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const parts = routeParts(url);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      service: 'PetVital API',
      version: '1.0.0',
      timestamp: now()
    });
  }

  if (parts[1] === 'products') return handleProducts(req, res, url, parts);
  if (parts[1] === 'categories') return handleCategories(req, res);
  if (parts[1] === 'cart') return handleCart(req, res, parts);
  if (parts[1] === 'newsletter') return handleNewsletter(req, res, parts);
  if (parts[1] === 'orders') return handleOrders(req, res, parts);
  if (parts[1] === 'checkout') return handleCheckout(req, res);
  if (parts[1] === 'contact') return handleContact(req, res);

  return sendError(res, 404, 'API route not found.');
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === '/' ? '/homepage.html' : url.pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT, normalizedPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    res.end(file);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
      return;
    }

    await serveStatic(req, res, url);
  } catch (error) {
    sendError(res, error.statusCode || 500, error.message || 'Server error.', error.details);
  }
});

ensureDataFiles()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`PetVital backend running at http://localhost:${PORT}`);
      console.log(`API health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
  });
