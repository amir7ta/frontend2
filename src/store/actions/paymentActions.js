import { createAsyncThunk } from "@reduxjs/toolkit";
import paymentApi from "../../utils/api/paymentApi";

export const pay = createAsyncThunk("payment/pay", async (forPaymentRequest) => {
  const mappedItems = forPaymentRequest.items.map((item)=>{
    return {
      quantity : item.quantity,
      size : item.size,
      price : item.price,
      productSizeId : item.productSizeId
    }
  })
  const newPaymentRequest = {
                     "items":mappedItems, 
                     "discount":forPaymentRequest.discount,
                     "totalPrice" : forPaymentRequest.total ,
                     "userId":forPaymentRequest.userId,
                     "orderId":forPaymentRequest.orderId,
                     "bankName":forPaymentRequest.bankName
                    };
  const createdOrderAndPayment = await paymentApi.pay(newPaymentRequest);
  return createdOrderAndPayment;
});

export const verify = createAsyncThunk("payment/verification", async (forVerifyPayment) => {
    const res = await paymentApi.verification(forVerifyPayment);
    return res;
  
});
export const paymentNotSuccess = createAsyncThunk("payment/saveResult", async (forSaveResult) => {
    const res = await paymentApi.saveNotSuccess(forSaveResult);
    return res;
  
});