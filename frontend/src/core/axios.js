import axios from 'axios';

export const API_URL = 'https://k6e103.p.ssafy.io:8443/api';

export const Axios = axios.create({
  baseURL: API_URL,
});
