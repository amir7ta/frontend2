import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pay, verify , paymentNotSuccess } from "../../store/actions/paymentActions";
import { selectAuthorityCode , selectPaymentId , selectRefId, selectError, selectBankName, setBank, setPayment, selectBankPaymentId} from "../../store/reducers/paymentSlice";


export const usePayment = () => {
  const bankPaymentId = useSelector(selectBankPaymentId);
  const paymentId = useSelector(selectPaymentId);
  const refId = useSelector(selectRefId);
  const error = useSelector(selectError);
  const bankName = useSelector(selectBankName);

  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  const setBankHandler = (bank, e) => {
    dispatch(setBank({"bankName":bank}))
  };

  const paymentHandler = async (forPayment, e) => {
    const { payload: payment } = await dispatch(pay(forPayment));

    if (payment){
      //dispatch(setPayment(payment));
      window.location.href = payment.gatewayUrl
    }
    return payment;
  };


  const verifyHandler = async (forVerify,e) => {
    const { payload: payment } = await dispatch(verify(forVerify));
    if (payment){
      dispatch(setPayment(payment));
    }
    return payment;
  };

  const paymentNotSuccessHandler = async (ForSaveResult,e) => {
     dispatch(paymentNotSuccess(ForSaveResult));
  };

  return { 
    pay: paymentHandler, 
    verify: verifyHandler, 
    paymentNotSuccess:paymentNotSuccessHandler,
    setBankName:setBankHandler,
    bankPaymentId,
    paymentId,
    refId,
    error,
    bankName
  };
};
