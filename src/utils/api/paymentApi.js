import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.ZARINPAL_API

const pay = async (req) => {
  
  const response = await axios.post(`${API_URL}/pay`,req)
    .then(function(response) {
      //  browserHistory.push('/features');
      return response.data
    })
    .catch(function(error) {
      alert(error?.response?.data);
    });
  
}

const verification = async (forVerify) => {
  const response = await axios.post(`${API_URL}/verification`,forVerify).catch(function(error) {
    alert(response);
  })
}

export default {
  verification,
  pay
 
};