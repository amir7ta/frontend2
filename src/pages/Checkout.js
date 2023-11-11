import React, { useState, useEffect } from 'react';
import Payment from '../components/checkout/Payment';
import LogIn from '../components/checkout/LogIn';
import Shipping from '../components/checkout/Shipping';
import Confirmation from '../components/checkout/Confirmation';
import Complete from "../components/checkout/Complete"
import { useUser} from "../utils/hooks/useUser"

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePayment } from '../utils/hooks/usePayment';
import {  useOrder } from '../utils/hooks/useOrder';
import { useCart } from '../utils/hooks/useCart';

// const tabs = ["ورود", "آدرس", "روش پرداخت", "پرداخت", "پایان"];
   const tabs = ["ورود", "آدرس", "پرداخت", "پایان"];

function Checkout() {
  const { createOrder, deleteOrder } = useOrder();
  const { currentUser } = useUser();

  const { pay} = usePayment();

  const {discount, items, subtotal, defaultSubtotal, delivery, total, quantity ,orderId} = useCart();

  const [activeTab, setActiveTab] = useState(0);
  const [bankName,setBankName]=useState('')
  useEffect(() => {
    debugger
    if (currentUser) {
      setActiveTab(1);
    }
  }, [currentUser]);

  const isLastTab = activeTab === tabs.length -1 ;
  const isSecondLastTab = activeTab === tabs.length - 2;

  const onPaymentComplete = () => {
    setActiveTab(3);
  };

  const DoPayment = () => {
    
          let userId = currentUser.userID;
          pay({discount, items, subtotal, defaultSubtotal, total, quantity, userId, orderId, bankName})
        
  };
  const onBack = () => {
    setActiveTab(activeTab - 1);
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
              {index < tabs.length - 1 && (
                <div className={`checkout-tab-line ${index < activeTab ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="checkout-content">
          {activeTab === 0 && <LogIn />}
          {activeTab === 1 && <Shipping />}
          {/* {activeTab === 2 && <Payment />} */}
          {activeTab === 2 && <Confirmation onPaymentComplete={onPaymentComplete}  onBack={onBack} onPayment={DoPayment}/>}
          {activeTab === 3 && <Complete />}
        </div>
        <div className="checkout-bottom">
          {!isLastTab ? (
            activeTab === 0 ? (
              <Link to="/cart"><button className='second-button'>بازگشت</button></Link>
            ) : (
              <a><button className='second-button' onClick={() => setActiveTab(activeTab - 1)}>بازگشت</button></a>
            )
          ) : null}
          {currentUser && !isSecondLastTab && !isLastTab && (
            <a><button onClick={() => setActiveTab(activeTab + 1)}>بعدی</button></a>
          )}
           {currentUser &&  isSecondLastTab && (
            <a><button onClick={() => DoPayment}>پرداخت</button></a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout;
