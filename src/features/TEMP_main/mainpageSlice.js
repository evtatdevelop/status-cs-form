import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uplodeData, getStaffbookData } from "./mainpageSliceAPI";


const initialState = {
  loading: false,
  darkTheme: false,
  // data: [],
}

export const getStaffbook = createAsyncThunk( 'mainpage/getStaffbook', async ( data ) => await getStaffbookData(data) )

export const upData  = createAsyncThunk( 'user/uplodeData', async ( data ) => await uplodeData(data) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.darkTheme = action.payload;
      localStorage.setItem(`darkTheme`, JSON.stringify(state.darkTheme));
    }

  },

  extraReducers: (builder) => { builder
    
    .addCase(getStaffbook.pending, ( state ) => { state.loading = true })
    .addCase(getStaffbook.fulfilled, ( state, action ) => {
      if ( state.staffbook.length < state.counter * state.row_num ) state.staffbook = [...state.staffbook, ...action.payload];
      state.row_from = state.staffbook.length + 1
      state.loading = false;
    })

    .addCase(upData.pending, ( state ) => { state.loading = true })
    .addCase(upData.fulfilled, ( state, action ) => {
      state.loading = false;
      state.data = [];
    })
  }
});

export const { changeTheme } = mainpageSlice.actions;

export const loading      = ( state ) => state.mainpage.loading;
export const darkTheme    = ( state ) => state.mainpage.darkTheme;

export default mainpageSlice.reducer;
