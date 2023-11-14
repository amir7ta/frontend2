import axios from 'axios';
import { variables } from './variables.js';

const API_URL = variables.PAYMENT_API

const pay = async (req) => {
    try {
      const response = await axios.post(`${API_URL}/pay`,req);
      if (!response.data.error) {
        window.location.href = response.data.gatewayUrl;
      }
      return {paymentId:null, authorityCode: null, error: response.data.error };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {paymentId:null, authorityCode: null,error: error.response.error };
      }
      if (error.response && error.response.status === 500) {
        return {paymentId:null, authorityCode: null,error:"تایید کد تراکنش با مشکل مواجه شد" };
      }
      return ({paymentId:null, authorityCode: null,error : "در سرور خطایی پیش آمده است."})
    }
}

const verification = async (forVerify) => {
  try {
    const response = await axios.post(`${API_URL}/verification`,forVerify);
    if (!response.data.error) {
      localStorage.setItem('payment', response.data);
      return response.data.refId;
    }
    return { refId: null,error:response.data.error };
  } catch (error) {
    if (error.response && error.response.status === 400) {
     return (error.response)
    }
    if (error.response && error.response.status === 500) {
      return { refId: null,error:"تایید کد تراکنش با مشکل مواجه شد" };
    }
    return ({refId: null,error : "در سرور خطایی پیش آمده است."})
  }
  
}

export default {
  verification,
  pay
 
};