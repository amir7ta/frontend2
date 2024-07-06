import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.PRODUCT_API

const getProducts = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/filter`,{params});
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

const getProductBreadCrumb = async (productId) => {
  try {
    console.log(">>getProductBreadCrumb")

    const response = await axios.get(`${API_URL}/breadcrumb/${productId}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching product breadcrumb:', error);
    throw error;
  }
}

const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

const updateProduct = async (productId, product) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export default {
  getProductBreadCrumb,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
