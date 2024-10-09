import React, { useState } from 'react'
import OrderSummary from './OrderSummary'
import CartItem from "../cart/CartItem";
import { useCart } from "../../utils/hooks/useCart"

function Confirmation({ onPaymentComplete, onBack, onPayment }) {

  return (
    <div className='checkout-contentbox'>
      <div className='checkout-left'>
        <h1>بررسی نهایی سفارش شما</h1>  
        <div className="line-divider"></div>
        <CartItem />
      </div>
      {/* <div className='checkout-right'> */}
      <OrderSummary onPaymentComplete={onPaymentComplete} />
      {/* </div> */}
     
    </div>
  )
}

export default Confirmation;
