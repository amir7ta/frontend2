import axios from 'axios';
import { variables } from './variables.js';
import qs from 'qs';

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
    const response = await axios.get(`${API_URL}/forfilter`, {
      params: route ? { route } : {}
    });
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


const getCategoryBreadCrumb = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/breadcrumb/${route}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category breadcrumb:', error);
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

const addCategory = async (Category) => {
  try {
    const response = await axios.post(API_URL, Category, {
      headers: {
        'Content-Type': 'multipart/form-data' // هدر مناسب برای ارسال فرم
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding Category:', error);
    throw error;
  }
}

const activeCategory = async (categoryId) => {
  try {
    const response = await axios.post(`${API_URL}/active`, categoryId, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error active Category:', error);
    throw error;
  }
}

const deactiveCategory = async (categoryId) => {
  try {
    const response = await axios.post(`${API_URL}/deactive`, categoryId, {
      headers: {
        'Content-Type': 'application/json',
      }
    });    return response.data;
  } catch (error) {
    console.error('Error deactive Category:', error);
    throw error;
  }
}

const updateCategory = async (categoryId, category) => {
  try {
    const response = await axios.put(`${API_URL}/${categoryId}`, category, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Category:', error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/${categoryId}`);
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
  getCategoriesHirearchyByRoute,
  getCategoryBreadCrumb,
  deactiveCategory,
  activeCategory
};
