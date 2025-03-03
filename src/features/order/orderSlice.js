import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder, delAttachment, getAttachments, uploadFile } from './orderSliceAPI';

const initialState = {
  loading: false,
  data: [],
  delAttachLoading: false,
  addAttachLoading: false,
}

export const getOrderData = createAsyncThunk( 'order/getOrderData', async ( data ) => await getOrder(data) );
export const getAttachmentsData = createAsyncThunk( 'order/getAttachmentsData', async ( data ) => await getAttachments(data) );
export const deldelAttachData = createAsyncThunk( 'order/deldelAttachData', async ( data ) => await delAttachment(data) );
export const uploadFileData = createAsyncThunk( 'order/uploadFileData', async ( data ) => await uploadFile(data) );

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAttachLoading: (state) => {
      state.addAttachLoading = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, ( state ) => { state.loading = true })
      .addCase(getOrderData.fulfilled, ( state, action ) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getAttachmentsData.pending, ( state ) => {  })
      .addCase(getAttachmentsData.fulfilled, ( state, action ) => {
        state.addAttachLoading = false;
        state.data.attachments = action.payload;
        // console.log('payload', action.payload);
      })

      .addCase(deldelAttachData.pending, ( state ) => { state.delAttachLoading = true })
      .addCase(deldelAttachData.fulfilled, ( state, action ) => {
        state.delAttachLoading = false;
        state.data.attachments = action.payload;
      })

      .addCase(uploadFileData.pending, () => {})
      .addCase(uploadFileData.fulfilled, ( state, action ) => {
        state.addAttachLoading = false;
        // state.data.attachments = action.payload;
      })
  }
});

export const { setAttachLoading, } = orderSlice.actions;

export const orderData = ( state ) => state.order.data;
export const loading = ( state ) => state.order.loading;
export const delAttachLoading = ( state ) => state.order.delAttachLoading;
export const addAttachLoading = ( state ) => state.order.addAttachLoading;

export default orderSlice.reducer;
