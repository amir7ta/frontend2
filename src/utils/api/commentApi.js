import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.COMMENT_API

const getComments = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
}
const getUserComments = async (userId, productId) => {
  const response = await axios.get(`${API_URL}/${userId}`,productId);
  return response.data;
}

const addComment = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
}

const updateComment = async (commentId, comment) => {
  const response = await axios.put(`${API_URL}/${commentId}`, comment);
  return response.data;
}

const deleteComment = async (modelId) => {
  const response = await axios.delete(`${API_URL}/${modelId}`);
  return response.data;
}

export default {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  getUserComments
};