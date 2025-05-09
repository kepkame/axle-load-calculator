import axios from 'axios';

/**
 * Universal HTTP client for all API requests in the project
 */
const api = axios.create({
  baseURL: 'https://1a1607d9514f4230.mokky.dev',
  timeout: 10000, // 10 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
