import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});
export const registerUser = (data) => API.post('/register', data);
