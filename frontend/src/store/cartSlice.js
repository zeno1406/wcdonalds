import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        // Add new item
        state.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      } else {
        // Increase quantity of existing item
        existingItem.quantity++;
        existingItem.total = existingItem.quantity * existingItem.price;
      }
      
      // Update cart totals
      state.totalQuantity++;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Remove item from cart
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        // Remove item completely
        state.items = state.items.filter(item => item.id !== id);
      } else {
        // Decrease quantity
        existingItem.quantity--;
        existingItem.total = existingItem.quantity * existingItem.price;
      }
      
      // Update cart totals
      state.totalQuantity--;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Update item quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      // Calculate the difference in quantity
      const quantityDifference = quantity - item.quantity;
      
      // Update item
      item.quantity = quantity;
      item.total = item.quantity * item.price;
      
      // Update cart totals
      state.totalQuantity += quantityDifference;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Clear cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
