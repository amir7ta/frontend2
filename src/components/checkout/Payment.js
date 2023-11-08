import React, { useState } from 'react';

function Payment() {

  return (
    <div className='checkout-payment'>
      <h1>نحوه پرداخت</h1>
      <div className="line-divider"></div>
      <div className="payment-option">
        <label>
          <input type="radio" value="ZARINPAL" checked readOnly />
          درگاه پرداخت &#40; بانک ملی&#41;
        </label>  
      </div>
      {/* <p>شما به درگاه بانکی هدایت می شوید.</p> */}
    </div>
  )
}

export default Payment;
