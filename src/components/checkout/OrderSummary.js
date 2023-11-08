import React, {useEffect} from 'react'
import { useCart } from "../../utils/hooks/useCart"
import { formatPrice } from '../../utils/hooks/useUtil';

function OrderSummary({onPaymentComplete}) {
    const buttonStyles = {
        layout: 'vertical',
        color: 'blue',
        label: 'checkout',
    };
    const { subtotal, delivery, discount, defaultTotal, clearCart } = useCart();
  
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
              <div className="space-between">
                <p>تخفیف</p>
                <p>-10%</p>
              </div>
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
        <a><button onClick={() => DoPayment}>پرداخت</button></a>
    </div>
  )
}

export default OrderSummary