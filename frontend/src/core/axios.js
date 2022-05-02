import axios from 'axios';

const user_base = '/users';

export const API_URL = 'https://k6e103.p.ssafy.io:8443/api';

export const Axios = axios.create({
  baseURL: API_URL,
});

export const axios_apis = {
  users: {
    user: `${user_base}`,
    myPage: `${user_base}/find/me`,
    emailCheck: `${user_base}/emailCheck`,
    nickNameCheck: `${user_base}/nicknameCheck`,
    register: `${user_base}/register`,
    update: `${user_base}/update`,
  },
};
