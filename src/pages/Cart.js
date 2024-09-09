import React, { useState, useEffect } from 'react'
import CartItems from "../components/cart/CartItem";
import { useCart } from '../utils/hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, NumberInPersian } from '../utils/hooks/useUtil';
import {DELIVERY_THRESHOLD} from '../store/reducers/cartSlice';
import ConfirmOrderBottom from "../components/cart/ConfirmOrderBottom";
import '../styles/cart.scss';

function CartPage() {
  const { discount, applyDiscount, clearCart, items, subtotal, defaultSubtotal, delivery, total, quantity } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const navigate = useNavigate();

  const goToCheckOut = () => {
    navigate('/checkOut');
  };
  const [isMobile, setIsMobile] = useState(false)
  // const prevScrollPosition = useRef(window.scrollY);

  const handleResize = () => {
    if (window.innerWidth <= 950) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("resize", handleResize);
    handleResize(); // برای تنظیم مقدار اولیه
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="cart-container">
      <div className="cart-list flex-2">
        {items.length === 0 ? (
          <>
            <div className='empty-cart-container'>
              <div>
                <div>
                  <div>
                    <div className="empty-cart-image-container">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/site/empty-cart.svg`}
                        alt="نتیجه‌ای یافت نشد"
                        title=""
                      />
                    </div>
                  </div>
                </div>
                <p className='empty-cart-info'>سبد خرید شما خالی است!</p>
               
              </div>
            </div>
          </>
        ) : (
          <div className="cart-items">
              <div className="cart-items-header">
              <span>سبد خرید شما{quantity > 0 ? "(" + quantity + " کالا)" : ""}</span>
              <button onClick={clearCart} >
                    <svg
                      style={{
                        width: "18px",
                        height: "18px",
                        fill: "var(--color-icon-primary)",
                      }}
                    >
                      <use xlinkHref="#delete"></use>
                    </svg>
                    پاک کردن سبد خرید
                  </button>
              </div>
             
             
              <CartItems />
          </div>
        )}
      </div>
      {quantity > 0 && (
        <div style={{padding:'10px'}}>
        <div className="cart-summary">
          <div className="summary-content">
            <div className="space-between">
              <p>قیمت کالاها ({NumberInPersian(quantity)})</p>
              <span className="cart-product-price">
              {subtotal ? NumberInPersian(formatPrice(subtotal)) : NumberInPersian(0)}
                <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                  <use xlinkHref="#toman"></use>
                </svg>
              </span>

            </div>
            {discount > 0 && (
              <div className="space-between">
                <p>تخفیف</p>
                <span className="cart-product-price">
                  {NumberInPersian(formatPrice(discount))}%
                    <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                      <use xlinkHref="#toman"></use>
                    </svg>
                </span>

              </div>
              
            )}
            <div className="space-between">
              <p>هزینه ارسال</p>
              <span className="cart-product-price">
                 {delivery ? NumberInPersian(formatPrice(delivery)) : "رایگان"}
                    <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                      <use xlinkHref="#toman"></use>
                    </svg>
              </span>
            </div>
            {!isMobile &&(<>
            <div className="line"></div>
            <div className="space-between bold">
              <p>جمع سبد خرید</p>
              <span className="cart-total-price">
                  {total ? NumberInPersian(formatPrice(total)) : NumberInPersian(0)}
                    <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                      <use xlinkHref="#toman"></use>
                    </svg>
                </span>
            </div>
            </>
            )}
            {defaultSubtotal < DELIVERY_THRESHOLD ? (
              <p>
                اگر بیشتر از {NumberInPersian(formatPrice(DELIVERY_THRESHOLD))} خرید کنید ، هزینه ارسال شما رایگان می شود.
                مبلغ {NumberInPersian(formatPrice(DELIVERY_THRESHOLD - defaultSubtotal))} بیشتر
                .خرید کنید تا این سفارش رایگان برای شما ارسال شود
              </p>
            ) : (
              <p>با توجه به مبلغ فاکتور، هزینه پیک از شما دریافت نمی شود.</p>
            )}
          </div>
          {/* {!discount > 0 && (
            <div className="discount-code">
              <input
                placeholder="کد تخفیف"
                type="text"
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={() => applyDiscount(discountCode)}>اعمال</button>
            </div>
          )} */}
           
           {!isMobile &&(  <button className="cart-go-final-button" onClick={goToCheckOut}>تایید نهایی</button>)}
        </div>
        </div>
      )}
     {isMobile &&( <ConfirmOrderBottom></ConfirmOrderBottom>)}
    </div>
  );
}

export default CartPage