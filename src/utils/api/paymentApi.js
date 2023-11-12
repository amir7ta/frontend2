import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.ZARINPAL_API

const pay = async (req) => {
  
  const response = await axios.post(`${API_URL}/pay`,req)
    .then(function(response) {
      debugger
      window.location.href = response.data;
    })
    .catch(function(error) {
      alert(error?.response?.data);
    });
  
}

const verification = async (forVerify) => {
  const response = await axios.post(`${API_URL}/verification`,forVerify).catch(function(error) {
    return response
  })
}

export default {
  verification,
  pay
 
};