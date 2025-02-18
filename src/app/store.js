import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
import appReducer from '../appSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    app: appReducer
  },
});