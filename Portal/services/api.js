import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-snowy-silence-6194.fly.dev', // URL base da sua API
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
