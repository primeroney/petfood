# PetVital Backend Setup

The backend now uses Node.js, Express, MongoDB, and Mongoose.

## Install

```bash
npm install --prefix backend
```

## Environment

Copy the example file:

```bash
copy backend\.env.example backend\.env
```

Default values:

```text
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/petvital
CLIENT_URL=http://localhost:5173
```

## Seed Products

```bash
npm run seed --prefix backend
```

## Run

```bash
npm run dev --prefix backend
```

Backend URL:

```text
http://localhost:5000/api/health
```

## API Routes

```text
GET    /api/products
GET    /api/products?featured=true
GET    /api/products?category=Dogs
GET    /api/products?q=puppy
GET    /api/products/:slug
POST   /api/products
PATCH  /api/products/:slug
PUT    /api/products/:slug
DELETE /api/products/:slug

GET    /api/categories

GET    /api/cart
POST   /api/cart
PATCH  /api/cart/items/:productId
PUT    /api/cart/items/:productId
DELETE /api/cart/items/:productId
DELETE /api/cart

POST   /api/checkout
GET    /api/orders
GET    /api/orders/:orderNumber
POST   /api/orders
PATCH  /api/orders/:orderNumber

GET    /api/newsletter
POST   /api/newsletter
DELETE /api/newsletter/:email

GET    /api/contact
POST   /api/contact
```

The frontend sends an `x-session-id` header so the backend can keep a per-browser cart without login.
