import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder, delAttachment, getAttachments } from './orderSliceAPI';

const initialState = {
  loading: false,
  data: [],
  attachLoading: false,
}

export const getOrderData = createAsyncThunk( 'order/getOrderData', async ( data ) => await getOrder(data) );
export const getAttachmentsData = createAsyncThunk( 'order/getAttachmentsData', async ( data ) => await getAttachments(data) );
export const deldelAttachData = createAsyncThunk( 'order/deldelAttachData', async ( data ) => await delAttachment(data) );

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
      })

      .addCase(getAttachmentsData.pending, ( state ) => { state.loading = true })
      .addCase(getAttachmentsData.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data.attachments = action.payload;
        console.log('payload', action.payload);
      })

      .addCase(deldelAttachData.pending, ( state ) => { state.attachLoading = true })
      .addCase(deldelAttachData.fulfilled, ( state, action ) => {
        state.attachLoading = false;
        state.data.attachments = action.payload;
      })
  }
});

export const orderData = ( state ) => state.order.data;
export const loading = ( state ) => state.order.loading;
export const attachLoading = ( state ) => state.order.attachLoading;

export default orderSlice.reducer;
