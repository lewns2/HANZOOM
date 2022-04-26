import axios from 'axios';

export const API_URL = 'https://localhost:8443/api';

export const Axios = axios.create({
  baseURL: API_URL,
});
