# PetVital Full-Stack Setup

This version includes:

- React frontend with Vite
- Node.js and Express API
- MongoDB with Mongoose
- Product, cart, checkout, order, newsletter, and contact flows

## 1. Install Dependencies

From the project root:

```bash
npm run install:all
```

## 2. Configure MongoDB

Copy the backend env example:

```bash
copy backend\.env.example backend\.env
```

Default local MongoDB URL:

```text
mongodb://127.0.0.1:27017/petvital
```

If you use MongoDB Atlas, replace `MONGODB_URI` in `backend/.env`.

## 3. Seed Products

```bash
npm run seed
```

## 4. Run Frontend and Backend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000/api/health
```

## API Summary

```text
GET    /api/products
GET    /api/products?featured=true
GET    /api/products/:slug
POST   /api/products
PATCH  /api/products/:slug
DELETE /api/products/:slug

GET    /api/categories

GET    /api/cart
POST   /api/cart
PATCH  /api/cart/items/:productId
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

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    app.js
    server.js
    seed.js

frontend/
  src/
    api.js
    App.jsx
    main.jsx
    styles.css
```

The original HTML prototype files remain in the root folder for reference.
