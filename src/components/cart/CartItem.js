import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/hooks/useCart';
import { formatPrice } from '../../utils/hooks/useUtil';


function CartItem() {
  const { removeFromCart, updateQuantity, items } = useCart();

  return (  
    <>
      {items.map((item) => (
         <div className="cart-item" key={`${item.product.productId}-${item.size}`}>
          <Link to={`/${item.product.productId}`}>
            <div className='cart-item-img'>
              <img src={item.product.imageURL} alt={item.product.brand} />
            </div>
          </Link>
          <div className='cart-item-about'>
            <div className='cart-item-left'>
              <Link to={`/${item.product.productId}`}><p>{item.product.brand} {item.product.name}</p></Link>
              <p>{item.product.brand} : برند</p>
              <p>{item.size}: اندازه</p>
              <p>{item.quantity} : تعداد</p>
              <a onClick={() => removeFromCart(item.product.productId, item.productSizeId)}>حذف از سبد</a>
              </div>
              <div className='cart-item-right'>
                <p>{formatPrice(item.price)}</p>
                <div className='cart-item-quantity'>
                  <a onClick={() => updateQuantity(item.product.productId, item.productSizeId, item.quantity - 1)}>-</a>
                  <input type="number" value={item.quantity} onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity)) {
                        updateQuantity(item.product.productId, item.productSizeId, newQuantity);
                      }
                    }} />
                    <a onClick={() => updateQuantity(item.product.productId, item.productSizeId, item.quantity + 1)}>+</a>
                </div>
              </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItem;
