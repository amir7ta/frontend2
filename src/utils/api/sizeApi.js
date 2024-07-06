import axios from 'axios';
import { variables } from './variables.js';
import queryString from 'query-string';

const API_URL = variables.PRODUCTSIZE_API

const getProductSizes = async () => {
  const response = await axios.get(`${API_URL}/sizes/`);
  return response.data;
};

const getProductSizesByProductId = async (productIds) => {
  const params = queryString.stringify({ productIds }, { arrayFormat: 'index' }); // یا 'comma' را امتحان کنید
  try {
    const response = await axios.get(`${API_URL}/sizesbyproduct?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product sizes:', error);
    throw error;
  }
};

const getProductSize = async (productSizeId) => {
  const response = await axios.get(`${API_URL}/sizes/${productSizeId}`);
  return response.data;
};

const addProductSize = async (productSizeData) => {
  const response = await axios.post(`${API_URL}/sizes/`, productSizeData);
  return response.data;
};

const updateProductSize = async (productSizeId, productSizeData) => {
  const response = await axios.put(`${API_URL}/sizes/${productSizeId}`, productSizeData);
  return response.data;
};

const deleteProductSize = async (productSizeId) => {
  const response = await axios.delete(`${API_URL}/sizes/${productSizeId}`);
  return response.data;
};

export default {
    getProductSizes,
    getProductSizesByProductId,
    getProductSize,
    addProductSize,
    updateProductSize,
    deleteProductSize
  };