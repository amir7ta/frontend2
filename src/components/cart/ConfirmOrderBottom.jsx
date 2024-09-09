import React from "react";
import { formatPrice, NumberInPersian } from "../../utils/hooks/useUtil";
import { useCart } from "../../utils/hooks/useCart"; // فرض بر این است که شما از این هوک استفاده می‌کنید

const ConfirmOrderBottom  =  ()  => {
  const {  total} = useCart();
  return (
    <>
      <div className="cart-confirm-order-container">
        <div style={{display:"flex"}}>
       
        <button className="cart-go-final-button" onClick={ConfirmOrderBottom}>تایید نهایی</button>

        
          </div>
          <div>
            <p style={{fontSize:'.6rem'}}>جمع سبد خرید</p>
            <span className="cart-total-price">
                {total ? NumberInPersian(formatPrice(total)) : NumberInPersian(0)}
                  <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                    <use xlinkHref="#toman"></use>
                  </svg>
            </span>
          </div>
      </div>
    </>
  )};

export default ConfirmOrderBottom;


