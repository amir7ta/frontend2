import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pay, verify } from "../../store/actions/paymentActions";
import { useCart } from './useCart';


export const usePayment = () => {
  const dispatch = useDispatch();
  const {applyCardIsSaved } = useCart();
  useEffect(() => {
  }, []);
  // const paymentHandler = async (forPayment) => {
  //   const {applyCardIsSaved } = useCart();
  //   dispatch(pay(forPayment)).then((res)=>{
  //     dispatch(applyCardIsSaved(res.payload))
  //   });
  // };

  const paymentHandler = (forPayment, e) => {
    dispatch(pay(forPayment)).then((res)=>{
      debugger;
      if(res.payload)
        dispatch(applyCardIsSaved(res?.payload))
    });
  };


  const verifyHandler = async (forVerify,e) => {
    dispatch(verify(forVerify));
  };

  return { 
    pay: paymentHandler, 
    verify: verifyHandler, 

  };
};
