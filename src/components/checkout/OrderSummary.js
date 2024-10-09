import React, {useEffect, useState } from 'react'
import { useCart } from "../../utils/hooks/useCart"
import { formatPrice } from '../../utils/hooks/useUtil';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // آیکون لوکیشن
import { useUser } from "../../utils/hooks/useUser"

function OrderSummary({onPaymentComplete}) {
  const [discountCode, setDiscountCode] = useState('');
  const [errorMessageDiscount, setErrorMessage] = useState('');
  const { currentUser } = useUser();

  const handleDiscountApply = () => {
    if (discountCode.trim() === '') {
      setErrorMessage('لطفاً کد تخفیف را وارد کنید');
    } else {
      applyDiscount(discountCode)
    }
  };

    const buttonStyles = {
        layout: 'vertical',
        color: 'blue',
        label: 'checkout',
    };
    const { applyDiscount,total ,subtotal, delivery, discount, defaultTotal, error, errorMessage, clearCart, discountPrice } = useCart();

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order details:', order);
        const email = order.payer.email_address;
        const transactionId = order.purchase_units[0].payments.captures[0].id;
        clearCart();
        alert(`An order confirmation will be sent to email: ${email}. Transaction ID: ${transactionId}.`);
        onPaymentComplete();
      };
    const DoPayment = async(data)=>{
        onApprove()
    }
  return (
    <div className='order-summary'>
        <div className="space-between">
            <p>جمع</p>
            <p>{formatPrice(subtotal)}</p>
        </div>
        {discount > 0 && (
          <>
            <div className="space-between">
              <p>تخفیف</p>
              <p>{discount}%</p>
            </div>
            <div className="space-between">
              <p>مبلغ تخفیف</p>
              <p>{discountPrice}</p>
            </div>
          </>
        )}
        <div className="space-between">
            <p>هزینه ارسال</p>
            <p>{formatPrice(delivery)}</p>
        </div>
        <div className="line"></div>
        <div className="space-between bold">
            <p>قابل پرداخت</p>
            <p>{formatPrice(defaultTotal)}</p>
        </div>
        <div className='checkout-right'>
          <div className="discount-code">
            <input placeholder="کد تخفیف" type="text" onChange={(e) => setDiscountCode(e.target.value)} />
            <button onClick={handleDiscountApply}>اعمال</button>
          </div>
        
          {errorMessageDiscount && <div className="error">{errorMessageDiscount}</div>}
          {error && <div className="error">{errorMessage}</div>}
        </div>
        <div className="line-divider"></div>

        <span>آدرس تحویل</span>
        <div className="delivery-address">
          <LocationOnIcon className="location-icon" />
          <div className="address-details">
            <p>{currentUser?.firstName} {currentUser?.lastName}</p>
            <p>{currentUser?.address}</p>
            <p>{currentUser?.postalCode}، {currentUser?.city}</p>
          </div>
        </div>
    </div>
  )
}

export default OrderSummary