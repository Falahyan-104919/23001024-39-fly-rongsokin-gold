import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../components/cart/utils/cartSlice';

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
