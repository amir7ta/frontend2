import React, { useState } from 'react';
import { usePayment} from '../../utils/hooks/usePayment';

function Payment() {
  const { setBankName} = usePayment();
  const [bankState, setBankState] = useState(0);
  const handleChange = e => {
    debugger
    const { value } = e.target;
    setBankState(value);
    setBankName(value);
  };

  return (
    <div className='checkout-payment'>
      <h1>نحوه پرداخت</h1>
      <div className="line-divider"></div>
      
      <div className="payment-option">
        <label>
          <input name="bankName" type="radio" value="ZIBAL" onChange={e=>handleChange(e)} checked={bankState === "ZIBAL"} />
          درگاه پرداخت &#40; زیبال&#41;
        </label>  
      </div>

      <div className="payment-option">
        <label>
          <input name="bankName" type="radio" value="ZARINPAL" onChange={handleChange} checked={bankState === "ZARINPAL"}/>
          درگاه پرداخت &#40; زرین پال&#41;
        </label>  
      </div>
   
      {/* <p>شما به درگاه بانکی هدایت می شوید.</p> */}
    </div>
  )
}

export default Payment;
