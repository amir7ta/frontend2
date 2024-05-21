import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.IMAGE_API


const geImagesByProductId = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}/productImage`);
  return response.data;
};

const deleteImagesByProductId = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}/productImage`);
  return response.data;
}

const getImages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

const getImage = async (imageId) => {
  const response = await axios.get(`${API_URL}/${imageId}`);
  return response.data;
}

const addImage = async (image) => {
  const response = await axios.post(API_URL, image);
  return response.data;
}

const updateImage = async (imageId, image) => {
  const response = await axios.put(`${API_URL}/${imageId}`, image);
  return response.data;
}

const deleteImage = async (imageId) => {
  const response = await axios.delete(`${API_URL}/${imageId}`);
  return response.data;
}

export default {
  getImages,
  getImage,
  addImage,
  updateImage,
  deleteImage,
  deleteImagesByProductId,
  geImagesByProductId
};