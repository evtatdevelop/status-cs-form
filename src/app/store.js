import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
// import mainpageReducer from '../features/main/mainpageSlice';
// import corpsystemsReducer  from '../features/corpsystems/corpsystemsSlice';
// import statuspageReducer from '../features/statusPage/statusPageSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    order: orderReducer,
    // mainpage: mainpageReducer,
    // corpsystems: corpsystemsReducer,
    // statuspage: statuspageReducer,
  },
});