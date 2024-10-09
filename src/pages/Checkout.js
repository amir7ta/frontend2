import React, { useState, useEffect } from 'react';
import LogIn from '../components/checkout/LogIn';
import Shipping from '../components/checkout/Shipping';
import Confirmation from '../components/checkout/Confirmation';
import Complete from "../components/checkout/Complete"
import PaymentWay from '../components/checkout/PaymentWay';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import { useUser} from "../utils/hooks/useUser"
import { Link, useSearchParams } from 'react-router-dom';
import { usePayment } from '../utils/hooks/usePayment';
import { useOrder } from '../utils/hooks/useOrder';
import { useCart } from '../utils/hooks/useCart';
import '../styles/checkout.scss';

// const tabs = ["ورود", "آدرس", "روش پرداخت", "پرداخت", "پایان"];
   const tabs = ["ورود", "آدرس", "پرداخت", "پایان"];
  
  const loginTab = 0
  const addressTab = 1
  const paymentWayTab = 2
  const paymentTab = 2
  const completeTab = 3

function Checkout() {
  let [searchParams, setSearchParams] = useSearchParams();  
  const [loading, setLoading] = useState(false);
  const [paymentWay, setPaymentWay] = useState('ZIBAL');

  const [loginError, setLoginError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [paymentWayError, setPaymentWayError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  const [completeError, setCompleteError] = useState('');
const[paymentIsDone, setPaymentIsDone] = useState(false);
  let [status, setStatus] = useState(
    searchParams.get("Status")  //zarinpall
  );
  let [authority, setAuthority] = useState(
    searchParams.get("Authority")//zarinpall
  );
  let [trackId, setTrackId] = useState(
    searchParams.get("trackId")//zibal
  );
  const { createOrder, deleteOrder } = useOrder();
  const { currentUser } = useUser();

  const { pay ,bankName} = usePayment();

  const {discount, items, subtotal, defaultSubtotal, delivery, total, quantity ,orderId} = useCart();

  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if(status!=null || trackId!=null)
    {
      setActiveTab(completeTab);
    }
    else{
      if (currentUser) {
        setActiveTab(addressTab);
      }
    }
  }, [status]);
  

  const isLastTab = activeTab >= completeTab ;
  const isSecondLastTab = activeTab === paymentTab;
  const handlerPaymentFinishedEvent=(payment)=>{
    if(payment===true){
      GoNext()
      setPaymentIsDone(true);
    }
    else
    {
      setPaymentIsDone(false);
    }

  }
  const onPaymentComplete = () => {
    setActiveTab(completeTab);
  };
  const handlePaymentWay = (selected) => {
    setPaymentWay(selected);
    setPaymentWayError('');
  };
  function  DoPayment (){
    setLoading(true);

    let userId = currentUser.userID;
    pay({discount, items, subtotal, defaultSubtotal, total, quantity, userId, orderId, bankName})
  };
  const GoBack = () => {
    setActiveTab(activeTab - 1);
  };
  const GoNext = () => {
    if (activeTab === paymentWayTab && paymentWay === '') {
      setPaymentWayError('روش پرداخت را مشخص نمایید');
      return;
    }
    setActiveTab(activeTab + 1);
  };
  return (
    <div className='checkout'>
      <div className='checkout-container'>
        <nav className='checkout-nav'>
          {tabs.map((tab, index) => (
            <React.Fragment key={tab}>
              <div className={`checkout-tab ${index === activeTab ? 'active' : ''}`}>
                <span className={`${index < activeTab ? 'completed' : ''}`}>
                  {index+1}
                </span>
                <p>{tab}</p>
              </div>
              {index < completeTab && (
                <div className={`checkout-tab-line ${index < activeTab ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="checkout-content">
              {activeTab === loginTab && (
                  <>
                    <LogIn />
                  {loginError && <div className="error">{loginError}</div>}
                </>
              )}
              {activeTab === addressTab && (
                <>
                  <Shipping />
                  {addressError && <div className="error">{addressError}</div>}
                </>
              )}
              {/* {activeTab === paymentWayTab && (
                <>
                  <PaymentWay selected={paymentWay} onChange={handlePaymentWay} />
                  {paymentWayError && <div className="error">{paymentWayError}</div>}
                </>
              )} */}
              {activeTab === paymentTab && (
                <>
                  <Confirmation onPaymentComplete={onPaymentComplete} />
                  {confirmationError && <div className="error">{confirmationError}</div>}
                </>
              )}
               {activeTab >= completeTab && (
                <>
                  <Complete doPaymentCallback={DoPayment} paymentFinishedEvent={handlerPaymentFinishedEvent}/>
                  {completeError && <div className="error">{completeError}</div>}
                </>
              )}
        </div>
        <div className="checkout-bottom">
          {!paymentIsDone && (
            activeTab === loginTab ? (
              <Link to="/cart"><button className='checkout-back-button'>بازگشت</button></Link>
            ) : (
              <a><button className='checkout-back-button' onClick={() => GoBack()}>بازگشت</button></a>
            )
          )}
          {currentUser && activeTab< paymentTab &&  (
            <a><button className="checkout-next-button" onClick={() => GoNext()}>بعدی</button></a>
          )}
           {currentUser &&  activeTab>addressTab && !paymentIsDone && (
            <LoadingButton
            size="small"

            onClick={DoPayment}
            endIcon={<SendIcon className="rotated-icon"/>}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>پرداخت</span>
          </LoadingButton>

          )}
         
        </div>
       
      </div>
    </div>
  )
}

export default Checkout;
