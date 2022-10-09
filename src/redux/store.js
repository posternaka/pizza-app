import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import card from './slices/cardSlices';

export const store = configureStore({
  reducer: {
    filter,
    card
  },
})