import { createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '../../utils/api/orderApi';


export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const orders = await orderApi.getOrders();
    return orders;
  }
);

export const fetchOrdersByUserId = createAsyncThunk('products/fetchProductById', async (userId) => {
  const orders = await orderApi.getOrdersByUserId(userId);
  return orders;
});

export const createOrder = createAsyncThunk('order/createOrder', async ({discount, items, subtotal, defaultSubtotal, total, quantity, userId}) => {
  const mappedItems = items.map((item)=>{
    return {
      quantity : item.quantity,
      size : item.size,
      price : item.price,
      productSizeId : item.productSizeId
    }
  })
  const newOrder = { "discount":discount, "items":mappedItems, "totalPrice" : total ,"userId":userId};
  const createdOrder = await orderApi.createOrder(newOrder);
  debugger;
  return createdOrder;
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (orderId ) => {
  const res = await orderApi.deleteOrder(orderId);
  return res;
});