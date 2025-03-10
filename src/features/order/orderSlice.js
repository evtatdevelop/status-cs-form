import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder, delAttachment, getAttachments, uploadFile, completeStage, removeRequest,  } from './orderSliceAPI';

const initialState = {
  loading: false,
  data: [],
  delAttachLoading: false,
  addAttachLoading: false,
  actionsLoading: false,
}

export const getOrderData = createAsyncThunk( 'order/getOrderData', async ( data ) => await getOrder(data) );
export const getAttachmentsData = createAsyncThunk( 'order/getAttachmentsData', async ( data ) => await getAttachments(data) );
export const deldelAttachData = createAsyncThunk( 'order/deldelAttachData', async ( data ) => await delAttachment(data) );
export const uploadFileData = createAsyncThunk( 'order/uploadFileData', async ( data ) => await uploadFile(data) );
export const completeStageData = createAsyncThunk( 'order/completeStageData', async ( data ) => await completeStage(data) );
export const removeRequestData = createAsyncThunk( 'order/removeRequestData', async ( data ) => await removeRequest(data) );

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

      .addCase(completeStageData.pending, ( state ) => { state.actionsLoading = true })
      .addCase(completeStageData.fulfilled, ( state, action ) => {
        state.actionsLoading = false
        console.log(action.payload);
        
      })

      .addCase(removeRequestData.pending, ( state ) => { state.actionsLoading = true })
      .addCase(removeRequestData.fulfilled, ( state, action ) => {
        state.actionsLoading = false;
        console.log(action.payload);
      })
  }
});

export const { setAttachLoading, } = orderSlice.actions;

export const orderData = ( state ) => state.order.data;
export const loading = ( state ) => state.order.loading;
export const delAttachLoading = ( state ) => state.order.delAttachLoading;
export const addAttachLoading = ( state ) => state.order.addAttachLoading;
export const actionsLoading = ( state ) => state.order.actionsLoading;

export default orderSlice.reducer;
