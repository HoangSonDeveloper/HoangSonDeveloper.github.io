import axios, { AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    const request = config;

    if (token && request.url !== '/user/login/anonymous') {
      request.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Attempt to get the actual error returned from API
    const err = error.response || error;
    if (err.data === 'Forbidden') {
      localStorage.removeItem('token');
    }

    return Promise.reject(err.data); // Propagate rejection back to caller
  },
);

export default api;
