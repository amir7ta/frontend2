import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.COMMENT_API

const getComments = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

const getUserComments = async (userId, productId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
}

const addComment = async (model) => {
  try {
    const response = await axios.post(API_URL, model);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

const updateComment = async (commentId, comment) => {
  try {
    const response = await axios.put(`${API_URL}/${commentId}`, comment);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}

const deleteComment = async (modelId) => {
  try {
    const response = await axios.delete(`${API_URL}/${modelId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

export default {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  getUserComments
};
