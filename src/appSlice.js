import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  darkTheme: false,
  langMode: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    setTheme: (state, action) => {
      state.darkTheme = action.payload;
      localStorage.setItem(`darkTheme`, JSON.stringify(action.payload));
    },

    setLangMode: (state, action) => {
      state.langMode = action.payload;
    },
  },

});

export const { setTheme, setLangMode } = appSlice.actions;

export const darkTheme = ( state ) => state.app.darkTheme;
export const langMode = ( state ) => state.app.langMode;
export const loading = ( state ) => state.app.loading;

export default appSlice.reducer;
