import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  darkTheme: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },

});

export const { setTheme } = appSlice.actions;

export const darkTheme = ( state ) => state.app.darkTheme;
export const loading = ( state ) => state.app.loading;

export default appSlice.reducer;
