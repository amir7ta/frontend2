import React, { useState } from 'react'
import OrderSummary from './OrderSummary'
import CartItem from "../cart/CartItem";
import { useUser} from "../../utils/hooks/useUser"
import { useCart } from "../../utils/hooks/useCart"


function Confirmation({onPaymentComplete,onBack,onPayment}) {
  const { currentUser } = useUser();
  const { applyDiscount } = useCart();

  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className='checkout-contentbox flex'>
      <div className='checkout-left'>
        <h1>بررسی نهایی سفارش شما</h1>  
        <div className="line-divider"></div>
        <CartItem></CartItem>
      </div>
      <div className='checkout-right'>
      <h2>آدرس تحویل</h2>
        <div className="line-divider"></div>
          <p>{currentUser?.firstName} {currentUser?.lastName}</p>
          <p>{currentUser?.address}</p>
          <p>{currentUser?.postalCode} {currentUser?.city}</p>
          <p>ایران</p>
          { !discountCode > 0 && 
            <div className="discount-code">
              <input placeholder="کد تخفیف" type="text" onChange={(e) => setDiscountCode(e.target.value)} />
              <button onClick={() => applyDiscount(discountCode)}>اعمال</button>
            </div>
          }
        <OrderSummary onPaymentComplete={onPaymentComplete}/>
        {/* <div className="checkout-bottom">
        {currentUser && (
              <a><button className='second-button' onClick={() => onBack()}>بازگشت</button></a>
              )}
           {currentUser &&  (
            <a><button onClick={() => onPayment()}>پرداخت</button></a>
          )}
          </div> */}
      </div>
    
    </div>
    
  )
}

export default Confirmation