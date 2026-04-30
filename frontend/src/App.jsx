import { useEffect, useMemo, useState } from 'react';
import { api, getSessionId } from './api';

const iconMap = {
  dog: '🐶',
  cat: '🐱',
  bone: '🦴',
  carrot: '🥕',
  product: '🥣'
};

const emptyCheckout = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States'
};

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], totals: { subtotal: 0, shipping: 0, tax: 0, total: 0 } });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [checkout, setCheckout] = useState(emptyCheckout);
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSite() {
      try {
        const [productData, cartData] = await Promise.all([
          api.products('?featured=true'),
          api.cart()
        ]);
        setProducts(productData);
        setCart(cartData);
        setSelectedProduct(productData[0] || null);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSite();
  }, []);

  const cartCount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  async function handleAddToCart(product, quantity = 1, size = '') {
    try {
      const updatedCart = await api.addToCart(product._id, quantity, size);
      setCart(updatedCart);
      setMessage(`${product.name} added to cart.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleQuantity(productId, quantity) {
    if (quantity < 1) return;
    const updatedCart = await api.updateCartItem(productId, quantity);
    setCart(updatedCart);
  }

  async function handleRemove(productId) {
    const updatedCart = await api.removeCartItem(productId);
    setCart(updatedCart);
  }

  async function handleNewsletter(event) {
    event.preventDefault();
    try {
      await api.subscribe(newsletterEmail);
      setNewsletterEmail('');
      setMessage('Newsletter subscription saved.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleCheckout(event) {
    event.preventDefault();
    try {
      const result = await api.checkout({
        sessionId: getSessionId(),
        customer: checkout,
        shippingMethod: 'standard'
      });
      setOrder(result.order);
      setCart(result.cart);
      setCheckout(emptyCheckout);
      setMessage(`Order placed: ${result.order.orderNumber}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <Nav cartCount={cartCount} />

      {message && (
        <button className="toast" onClick={() => setMessage('')}>
          {message}
        </button>
      )}

      <main>
        <Hero />
        <TrustSection />

        <section className="section" id="shop">
          <div className="container">
            <div className="section-header">
              <h2>Best Sellers</h2>
              <p>Real products loaded from the Express and MongoDB backend.</p>
            </div>

            {loading ? (
              <div className="empty-state">Loading products...</div>
            ) : (
              <ProductGrid
                products={products}
                selectedProduct={selectedProduct}
                onSelect={setSelectedProduct}
                onAdd={handleAddToCart}
              />
            )}
          </div>
        </section>

        {selectedProduct && (
          <ProductDetail product={selectedProduct} onAdd={handleAddToCart} />
        )}

        <CartSection
          cart={cart}
          checkout={checkout}
          order={order}
          onCheckoutChange={setCheckout}
          onCheckout={handleCheckout}
          onQuantity={handleQuantity}
          onRemove={handleRemove}
        />

        <Newsletter
          email={newsletterEmail}
          onEmail={setNewsletterEmail}
          onSubmit={handleNewsletter}
        />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

function Nav({ cartCount }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav">
      <a href="#top" className="nav-logo">PetVital</a>
      <button className="mobile-menu-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        <span />
      </button>
      <ul className={`nav-menu ${open ? 'active' : ''}`}>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#product">Product</a></li>
        <li><a href="#cart">Cart</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-icons">
        <span className="nav-icon">🔍</span>
        <span className="nav-icon">👤</span>
        <a className="nav-icon cart-link" href="#cart">🛒<span className="badge">{cartCount}</span></a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="hero-badge">Premium Quality</div>
        <h1>Nutrition Your <span>Pet Deserves</span></h1>
        <p>Vet-formulated pet food made with thoughtful ingredients and simple subscriptions.</p>
        <div className="hero-buttons">
          <a className="btn btn-primary" href="#shop">Shop Now</a>
          <a className="btn btn-secondary" href="#product">View Product</a>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    ['✓', 'Vet Approved', 'Formulated by veterinary nutritionists'],
    ['🌱', 'Organic Ingredients', 'Natural and responsibly sourced'],
    ['📦', 'Fresh Delivery', 'Delivered directly to your door'],
    ['💚', 'Healthy Pets', 'Balanced nutrition for daily wellness']
  ];

  return (
    <section className="trust-section">
      <div className="container trust-grid">
        {items.map(([icon, title, copy]) => (
          <div className="trust-item" key={title}>
            <div className="trust-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ products, selectedProduct, onSelect, onAdd }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <article
          className={`product-card ${selectedProduct?._id === product._id ? 'selected' : ''}`}
          key={product._id}
          onClick={() => onSelect(product)}
        >
          <div className="product-image">{iconMap[product.imageKey] || '🥣'}</div>
          <div className="product-info">
            <span className="product-tag">{product.tag}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <div className="product-footer">
              <div className="product-price">{money(product.price)}</div>
              <button className="btn" onClick={(event) => {
                event.stopPropagation();
                onAdd(product);
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProductDetail({ product, onAdd }) {
  const [size, setSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSize(product.sizes?.[0] || '');
    setQuantity(1);
  }, [product]);

  return (
    <section className="section product-detail" id="product">
      <div className="container product-wrapper">
        <div className="detail-image">{iconMap[product.imageKey] || '🥣'}</div>
        <div className="detail-info">
          <span className="product-tag">{product.category}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="price-row">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && <span>{money(product.oldPrice)}</span>}
          </div>
          <div className="size-options">
            {product.sizes.map((item) => (
              <button
                className={`size-btn ${size === item ? 'active' : ''}`}
                key={item}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="quantity-row">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input value={quantity} onChange={(event) => setQuantity(Number(event.target.value || 1))} />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="btn btn-primary" onClick={() => onAdd(product, quantity, size)}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

function CartSection({ cart, checkout, order, onCheckoutChange, onCheckout, onQuantity, onRemove }) {
  return (
    <section className="section cart-section" id="cart">
      <div className="container cart-layout">
        <div>
          <div className="section-header left">
            <h2>Your Cart</h2>
            <p>Cart data is saved through the Express API using a local session id.</p>
          </div>

          {cart.items.length === 0 ? (
            <div className="empty-state">Your cart is empty.</div>
          ) : (
            <div className="cart-items">
              {cart.items.map((item) => (
                <div className="cart-item" key={`${item.productId}-${item.size}`}>
                  <div className="cart-icon">{iconMap[item.imageKey] || '🥣'}</div>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.size || 'Standard'} · {money(item.price)}</p>
                    <div className="cart-actions">
                      <button onClick={() => onQuantity(item.productId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onQuantity(item.productId, item.quantity + 1)}>+</button>
                      <button onClick={() => onRemove(item.productId)}>Remove</button>
                    </div>
                  </div>
                  <strong>{money(item.lineTotal)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="checkout-panel">
          <h3>Checkout</h3>
          <Summary totals={cart.totals} />
          <form onSubmit={onCheckout} className="checkout-form">
            {Object.keys(emptyCheckout).map((field) => (
              <input
                key={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={checkout[field]}
                onChange={(event) => onCheckoutChange({ ...checkout, [field]: event.target.value })}
                required
              />
            ))}
            <button className="btn btn-primary" disabled={cart.items.length === 0}>Place Order</button>
          </form>
          {order && (
            <div className="order-success">
              <strong>Order confirmed</strong>
              <span>{order.orderNumber}</span>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function Summary({ totals }) {
  return (
    <div className="summary">
      <div><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
      <div><span>Shipping</span><strong>{totals.shipping === 0 ? 'FREE' : money(totals.shipping)}</strong></div>
      <div><span>Tax</span><strong>{money(totals.tax)}</strong></div>
      <div className="total"><span>Total</span><strong>{money(totals.total)}</strong></div>
    </div>
  );
}

function Newsletter({ email, onEmail, onSubmit }) {
  return (
    <section className="cta-section">
      <div className="container cta-container">
        <div className="cta-content">
          <h2>Subscribe & Save 20%</h2>
          <p>Join the PetVital family for nutrition tips and subscriber-only offers.</p>
        </div>
        <form className="cta-form" onSubmit={onSubmit}>
          <h3>Join the Family</h3>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => onEmail(event.target.value)}
              required
            />
            <button className="btn btn-primary">Join</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  async function submit(event) {
    event.preventDefault();
    await api.contact(form);
    setForm({ name: '', email: '', message: '' });
    setSent(true);
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <h2>Questions?</h2>
          <p>Send a message to the backend contact endpoint.</p>
        </div>
        <form onSubmit={submit} className="contact-form">
          <input placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <textarea placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          <button className="btn btn-primary">Send Message</button>
          {sent && <p className="form-note">Message sent.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-bottom">
        <p>© 2026 PetVital. Full-stack React, Express, and MongoDB demo.</p>
        <div>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
