import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cardSlices';

export const store = configureStore({
  reducer: {
    filter,
    cart
  },
})