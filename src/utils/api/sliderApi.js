import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.SLIDER_API

const getSliders = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/filter`,{params});
    return response.data;
  } catch (error) {
    console.error('Error fetching sliders:', error);
    throw error;
  }
}

const getSlider = async (sliderId) => {
  try {
    const response = await axios.get(`${API_URL}/${sliderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slider:', error);
    throw error;
  }
}


const addSlider = async (slider) => {
  try {
    const response = await axios.post(API_URL, slider);
    return response.data;
  } catch (error) {
    console.error('Error adding slider:', error);
    throw error;
  }
}

const updateSlider = async (sliderId, slider) => {
  try {
    const response = await axios.put(`${API_URL}/${sliderId}`, slider);
    return response.data;
  } catch (error) {
    console.error('Error updating slider:', error);
    throw error;
  }
}

const deleteSlider = async (sliderId) => {
  try {
    const response = await axios.delete(`${API_URL}/${sliderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting slider:', error);
    throw error;
  }
}

export default {
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider
};
