import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pay, verify } from "../../store/actions/paymentActions";

export const usePayment = () => {
  const dispatch = useDispatch();

  const paymentHandler = async (forPayment) => {
    await dispatch(pay(forPayment));
  };

  const verifyHandler = async (forVerify) => {
    await dispatch(verify(forVerify));
  };

  return { 
    pay: paymentHandler, 
    verify: verifyHandler, 
    order,
    payment
  };
};
