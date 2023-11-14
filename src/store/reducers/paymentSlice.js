import { createSlice } from '@reduxjs/toolkit';
import { pay, verify } from "../actions/paymentActions";

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    authorityCode:null,
    paymentId:null,
    error:null,
    refId:null,
  },
  reducers: {
    clearPayment: (state, action) => {
      state.authorityCode=null;
      state.paymentId=null;
      state.error=null;
      state.refId=null;
    },
    setPayment: (state, action) => {
      const { refId, error, paymentId, authorityCode } = action.payload;
      state.authorityCode=authorityCode;
      state.paymentId=paymentId;
      state.error=error;
      state.refId=refId;
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
      });
  },
});

export const { clearPayment, setPayment} = paymentSlice.actions;


export const selectAuthorityCode = (state) => state.payment.authorityCode;
export const selectPaymentId = (state) => state.payment.paymentId;
export const selectRefId = (state) => state.payment.refId;
export const selectError = (state) => state.payment.error;

export default paymentSlice.reducer;
