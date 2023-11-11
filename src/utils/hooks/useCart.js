import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, calculateSubtotal, getTotal, applyDiscount, clearCart ,applyCardIsSaved} from '../../store/reducers/cartSlice';
import { formatPrice } from './useUtil';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const subtotal = useSelector(state => state.cart.subtotal);
  const delivery = useSelector(state => state.cart.delivery);
  const discount = useSelector(state => state.cart.discount);
  const total = useSelector(state => state.cart.total);
  const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const orderId = useSelector(state => state.cart.orderId);

  useEffect(() => {
    dispatch(calculateSubtotal());
  }, [items, dispatch, quantity]);

  useEffect(() => {
    dispatch(getTotal());
  }, [subtotal, delivery, dispatch, discount]);

  const addToCartHandler = (item) => {
    debugger
    dispatch(addToCart(item));
  };
  
  const removeFromCartHandler = (itemId, productSizeId, size) => {
    const item = items.find((item) => item.product.productId === itemId && item.productSizeId === productSizeId ); 
    dispatch(removeFromCart({ product: item.product, productSizeId, size}));
  };
  
  const updateQuantityHandler = (productId, productSizeId, newQuantity) => {
    if (newQuantity === 0) {
      const item = items.find((item) => item.product.productId === productId && item.productSizeId === productSizeId);
      if (item) {
        dispatch(removeFromCart({ product: item.product, productSizeId }));
      }
    } else if (newQuantity <= 10) {
      dispatch(updateQuantity({ productId, productSizeId, quantity: newQuantity }));
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const applyDiscountHandler = (discountCode) => {
    const discount = 0.1;
    if(discountCode.toLowerCase() === "10off"){
      dispatch(applyDiscount({ discount }));
    } else{
      alert("کد تخفیف اشتباه است")
    }
  }; 

  const applyCardIsSavedHandler = (orderId) => {
    if(orderId>0){
      dispatch(applyCardIsSaved({ orderId }));
    } 
  }; 


  return { 
    addToCart: addToCartHandler, 
    removeFromCart: removeFromCartHandler, 
    updateQuantity: updateQuantityHandler, 
    clearCart: clearCartHandler, 
    applyDiscount: applyDiscountHandler,
    applyCardIsSaved:applyCardIsSavedHandler,
    items, 
    defaultSubtotal: subtotal,
    defaultTotal: total, 
    subtotal: subtotal, 
    delivery: delivery, 
    total: total, 
    quantity,
    discount,
    orderId
  };
};



