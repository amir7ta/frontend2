import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.CATEGORY_API

const filterCategories = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/filter`,{params});
    return response.data;
  } catch (error) {
    console.error('Error filter category:', error);
    throw error;
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error get All Categories category:', error);
    throw error;
  }
}

const getCategoriesForMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/formenu`);
    return response.data;
  } catch (error) {
    console.error('Error get All Categories category:', error);
    throw error;
  }
}

const getCategoriesHirearchyByRoute = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/${route}/forfilter`);
    return response.data;
  } catch (error) {
    console.error('Error get Categories Hirearchy By Route for filter:', error);
    throw error;
  }
}

const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error get Category By Id:', error);
    throw error;
  }
}

const getProductBreadCrumb = async (productId) => {
  try {
    console.log(">>getProductBreadCrumb")

    const response = await axios.get(`${API_URL}/product/${productId}/breadcrumbs`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching product breadcrumb:', error);
    throw error;
  }
}

const addCategory = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding Category:', error);
    throw error;
  }
}

const updateCategory = async (productId, product) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating Category:', error);
    throw error;
  }
}

const deleteCategory = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error;
  }
}

export default {
  filterCategories,
  getCategoriesForMenu,
  getProductBreadCrumb,
  getCategoryById,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoriesHirearchyByRoute
};
