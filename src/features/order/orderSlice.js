import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder } from './orderSliceAPI';

const initialState = {
  loading: false,
  data: [],
}

export const getOrderData = createAsyncThunk( 'order/getOrderData', async ( data ) => await getOrder(data) );

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, ( state ) => { state.loading = true })
      .addCase(getOrderData.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
        // console.log(action.payload);
      });

  }
});

export const orderData = ( state ) => state.order.data;
export const loading = ( state ) => state.order.loading;

export default orderSlice.reducer;
