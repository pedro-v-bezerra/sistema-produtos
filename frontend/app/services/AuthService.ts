import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

export const AuthService = {
  async login(data: LoginData) {
    return axios.post(`${BASE_URL}/auth/login`, data);
  },
};
