import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
export const getProducts = () => API.get('/products');
export const addToCart = (data) => API.post('/cart', data);
export const getCart = (userId) => API.get(`/cart/${userId}`);
export const checkout = (userId) => API.post('/checkout', { userId });
export const getOrders = (userId) => API.get(`/orders/${userId}`);