import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.ZARINPAL_API

const pay = async (forPayment) => {
  const response = await axios.post(`${API_URL}/pay`,forPayment);
  return response.data;
}

const verification = async (forVerify) => {
  const response = await axios.post(`${API_URL}/verification`,forVerify);
  return response.data;
}

export default {
  verification,
  pay
 
};