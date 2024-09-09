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
   const tabs = ["ورود", "آدرس","روش پرداخت", "پرداخت", "پایان"];
  
  const loginTab = 0
  const addressTab = 1
  const paymentWayTab = 2
  const paymentTab = 3
  const completeTab = 4

function Checkout() {
  let [searchParams, setSearchParams] = useSearchParams();  
  const [loading, setLoading] = React.useState(true);

  let [status, setStatus] = useState(
    searchParams.get("Status")
  );
  let [authority, setAuthority] = useState(
    searchParams.get("Authority")
  );
  let [trackId, setTrackId] = useState(
    searchParams.get("trackId")
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

  const isLastTab = activeTab === completeTab ;
  const isSecondLastTab = activeTab === paymentTab;

  const onPaymentComplete = () => {
    setActiveTab(4);
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
          {activeTab === loginTab && <LogIn />}
          {activeTab === addressTab && <Shipping />}
          {activeTab === paymentWayTab && <PaymentWay />}
          {activeTab === paymentTab && <Confirmation onPaymentComplete={onPaymentComplete}  />}
          {activeTab === completeTab && <Complete />}
        </div>
        <div className="checkout-bottom">
          {!isLastTab ? (
            activeTab === loginTab ? (
              <Link to="/cart"><button className='second-button'>بازگشت</button></Link>
            ) : (
              <a><button className='second-button' onClick={() => GoBack()}>بازگشت</button></a>
            )
          ) : null}
          {currentUser && !isSecondLastTab && !isLastTab && (
            <a><button onClick={() => GoNext()}>بعدی</button></a>
          )}
           {currentUser &&  isSecondLastTab && (
            // <a><button onClick={() => DoPayment()}>پرداخت</button></a>
            <LoadingButton
            size="small"
            onClick={DoPayment}
            endIcon={<SendIcon />}
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
