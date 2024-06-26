import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder, deleteOrder, } from '../../store/actions/orderActions';
import { useCart } from './useCart';


export const useOrder = () => {
  const dispatch = useDispatch();
  const {applyCardIsSaved } = useCart();
  useEffect(() => {
  }, []);

  const CreateOrderHandler = ({ discount, items, subtotal, defaultSubtotal, total, quantity, userId,orderId }, e) => {
    dispatch(createOrder({ discount, items, subtotal, defaultSubtotal, total, quantity, userId ,orderId})).then((res) => {
      dispatch(applyCardIsSaved(res.payload))
    });

    //let orderId = 
    //dispatch(applyCardIsSaved(orderId))
  };

  const deleteOrderHandler = (orderId, e) => {
    e.preventDefault();
    console.log("orderhook", orderId )
    if (window.confirm("این سفارش حذف شود؟")) {
      dispatch(deleteOrder(orderId)).then(() => {
        alert("سفارش حذف شد.");
      });
    }  
  };

  return { 
    createOrder: CreateOrderHandler,
    deleteOrder: deleteOrderHandler
  };
};



