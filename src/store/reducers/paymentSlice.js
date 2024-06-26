import { createSlice } from '@reduxjs/toolkit';
import { pay, verify } from "../actions/paymentActions";

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    bankPaymentId:null,
    paymentId:null,
    error:null,
    refId:null,
    bankName:null,
  },
  reducers: {
    clearPayment: (state, action) => {
      state.bankPaymentId=null;
      state.paymentId=null;
      state.error=null;
      state.refId=null;
      state.bankName=bankName;
    },
    setPayment: (state, action) => {
      const { refId, error, paymentId, bankPaymentId} = action.payload;
      state.bankPaymentId=bankPaymentId;
      state.paymentId=paymentId;
      state.error=error;
      state.refId=refId;
    },
    setBank: (state, action) => {
      const { bankName} = action.payload;
      state.bankName=bankName;
    },
  },extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error=null;
        state.refId=action.payload.refId;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("rejected")
      })
      
      .addCase(pay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(pay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error=null;
        state.bankPaymentId=action.payload.bankPaymentId;
        state.paymentId=action.payload.paymentId;
      })
      .addCase(pay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("rejected")
      })
      ;
  },
});

export const { clearPayment, setPayment, setBank} = paymentSlice.actions;


export const selectBankPaymentId = (state) => state.payment.bankPaymentId;
export const selectPaymentId = (state) => state.payment.paymentId;
export const selectRefId = (state) => state.payment.refId;
export const selectError = (state) => state.payment.error;
export const selectBankName = (state) => state.payment.bankName;

export default paymentSlice.reducer;
