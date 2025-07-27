import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

interface ProductRequest {
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
}

export const ProductService = {
  async getAll(token: string) {
    return axios.get(`${BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async create(data: ProductRequest, token: string) {
    return axios.post(`${BASE_URL}/products`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getById(id: string, token: string) {
    return axios.get(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async update(id: string, data: ProductRequest, token: string) {
    return axios.put(`${BASE_URL}/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async delete(id: string, token: string) {
    return axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
