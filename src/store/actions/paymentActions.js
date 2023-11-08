import { createAsyncThunk } from "@reduxjs/toolkit";
import paymentApi from "../../utils/api/paymentApi";

export const pay = createAsyncThunk("zarinpay/pay", async (forPaymentRequest) => {
  const res = await paymentApi.pay(forPaymentRequest);
  return res;

});

export const verify = createAsyncThunk("zarinpay/verification", async (forVerifyPayment) => {
    const res = await paymentApi.verification(forVerifyPayment);
    return res;
  
});
