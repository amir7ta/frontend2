import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.BRAND_API


const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error get All brands:', error);
    throw error;
  }
}


export default {
 getBrands
};
