import { createSlice } from '@reduxjs/toolkit';

export const DELIVERY_THRESHOLD = 1200;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
      items: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],    
      subtotal: 0,
      delivery: 0,
      discount: 0,
      total: 0,
      orderId:0
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size, quantity = 1, price, productSizeId } = action.payload;
      const existingItem = state.items.find(item => item.product.productId === product.productId && item.productSizeId === productSizeId );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, size, quantity, price , productSizeId});
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      const { product, productSizeId } = action.payload; 
      state.items = state.items.filter(item => item.product.productId !== product.productId || item.productSizeId !== productSizeId ); 
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, productSizeId, quantity } = action.payload;
      const cartItemIndex = state.items.findIndex(item => item.product.productId === productId && item.productSizeId === productSizeId);
      if (cartItemIndex !== -1) { 
        state.items[cartItemIndex].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },  
    clearCart: (state, action) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    calculateSubtotal: (state, action) => {
      const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      
      if (subtotal >= DELIVERY_THRESHOLD) {
        state.delivery = 0;
        state.subtotal = subtotal;
      } else {
        state.delivery = 60;
        state.subtotal = subtotal;
      }
    },
    updateDelivery: (state, action) => {
      state.delivery = action.payload.deliveryCost;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload.discount;
      console.log("discount sat:",state.discount)
    },
    applyCardIsSaved: (state, action) => {
      state.orderId = action.payload.orderId;
      console.log("cart is saved:",state.orderId)
    },
    getTotal: (state) => {
      state.total =  state.subtotal - (state.subtotal * state.discount) + state.delivery;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateSubtotal, updateDelivery, applyDiscount, getTotal, applyCardIsSaved } = cartSlice.actions;

export default cartSlice.reducer;