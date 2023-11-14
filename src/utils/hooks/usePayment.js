import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pay, verify } from "../../store/actions/paymentActions";
import { selectAuthorityCode , selectPaymentId , selectRefId, selectError, setPayment} from "../../store/reducers/paymentSlice";


export const usePayment = () => {
  const authorityCode = useSelector(selectAuthorityCode);
  const paymentId = useSelector(selectPaymentId);
  const refId = useSelector(selectRefId);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
  }, []);


  const paymentHandler = (forPayment, e) => {
    dispatch(pay(forPayment))
  };


  const verifyHandler = async (forVerify,e) => {
    const { payload: payment } = await dispatch(verify(forVerify));
    if (payment){
      dispatch(setPayment(payment));
    }
    return payment;
  };

  return { 
    pay: paymentHandler, 
    verify: verifyHandler, 
    authorityCode,
    paymentId,
    refId,
    error
  };
};
