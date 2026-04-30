const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getSessionId() {
  let sessionId = localStorage.getItem('petvital_session');

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('petvital_session', sessionId);
  }

  return sessionId;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': getSessionId(),
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export const api = {
  health: () => request('/health'),
  products: (query = '') => request(`/products${query}`),
  categories: () => request('/categories'),
  cart: () => request('/cart'),
  addToCart: (productId, quantity = 1, size = '') => request('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity, size })
  }),
  updateCartItem: (productId, quantity) => request(`/cart/items/${productId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity })
  }),
  removeCartItem: (productId) => request(`/cart/items/${productId}`, {
    method: 'DELETE'
  }),
  checkout: (payload) => request('/checkout', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  subscribe: (email) => request('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email, source: 'react-site' })
  }),
  contact: (payload) => request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
};
