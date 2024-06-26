import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.IMAGE_API

const getImagesByProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images by product ID:', error);
    throw error;
  }
};

const deleteImagesByProductId = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting images by product ID:', error);
    throw error;
  }
}

const getImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

const getImage = async (imageId) => {
  try {
    const response = await axios.get(`${API_URL}/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

const addImage = async (image) => {
  try {
    const response = await axios.post(API_URL, image);
    return response.data;
  } catch (error) {
    console.error('Error adding image:', error);
    throw error;
  }
}

const updateImage = async (imageId, image) => {
  try {
    const response = await axios.put(`${API_URL}/${imageId}`, image);
    return response.data;
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
}

const deleteImage = async (imageId) => {
  try {
    const response = await axios.delete(`${API_URL}/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export default {
  getImages,
  getImage,
  addImage,
  updateImage,
  deleteImage,
  deleteImagesByProductId,
  getImagesByProductId
};
