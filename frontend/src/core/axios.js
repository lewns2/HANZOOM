import axios from 'axios';

export const API_URL = 'http://localhost:8443/api';

export const Axios = axios.create({
  baseURL: API_URL,
});
