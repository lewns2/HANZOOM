import axios from 'axios';

const user_base = '/users';
const plan_base = '/plans';

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
    passwordCheck: `${user_base}/checkPassword`,
    register: `${user_base}/register`,
    update: `${user_base}/update`,
  },
  plans: {
    register: `${plan_base}/register`,
    find: `${plan_base}/chatroom/find`,
    findAll: `${plan_base}/mypage/find`,
    remove: `${plan_base}/remove`,
    update: `${plan_base}/update`,
  },
};
