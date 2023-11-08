import React, { useState } from 'react'
import CartItems from "../components/cart/CartItem";
import { useCart } from '../utils/hooks/useCart';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/hooks/useUtil';
import {DELIVERY_THRESHOLD} from '../store/reducers/cartSlice';

function CartPage() {
  const { discount, applyDiscount, clearCart, items, subtotal, defaultSubtotal, delivery, total, quantity } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className='cart flex container'>
      <div className='cart-container flex-2'>
        <h1>سبد خرید {quantity > 0 ?  "("+quantity + " کالا)"  : ""}</h1>
          {items.length === 0 ? (
            <p>سبد خرید شما خالی است.</p>
          ) : (
            <div className='cart-items'>
              <CartItems />
              <a onClick={clearCart}>پاک کردن سید خرید</a>
            </div>
          )}
      </div>
      {quantity > 0 && (
        <div className='cart-summary'>
          <div className='summary-content'>
            <h2>توضیحات</h2>
            <div className="space-between">
              <p>جمع</p>
              <p>{subtotal ? formatPrice(subtotal) : 0}</p>
            </div>
            {discount > 0 && (
              <div className="space-between">
                <p>تخفیف</p>
                <p>-10%</p>
              </div>
            )}
            <div className="space-between">
              <p>تحویل</p>
              <p>{delivery ? delivery : "Free"}</p>
            </div>
            <div className='line'></div>
            <div className="space-between bold" >
              <p>مجموع</p>
              <p >{total ? formatPrice(total) : 0}</p>
            </div>
         
              {defaultSubtotal < DELIVERY_THRESHOLD ? (
                <p>
                  مبلغ {formatPrice(DELIVERY_THRESHOLD - defaultSubtotal)} بیشتر خرید کنید تا هزینه پیک رایگان شود 
                </p>
              ) : ( <p>با توجه به مبلغ فاکتور، هزینه پیک از شما دریافت نمی شود.</p> )
              }
          </div>
          { !discount > 0 && 
            <div className="discount-code">
              <input placeholder="کد تخفیف" type="text" onChange={(e) => setDiscountCode(e.target.value)} />
              <button  onClick={() => applyDiscount(discountCode)}>اعمال</button>
            </div>
          }
             <div className="discount-code">
                <Link style={{width:"100%"}} to="/checkout"><button>تایید نهایی</button></Link>
             </div>
        </div>
        )}
      </div>
  );
}

export default CartPage