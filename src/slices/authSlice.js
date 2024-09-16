import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.userData = null;
    },
  },
});

export const authReducers = authSlice.reducer;
export const { login, logout } = authSlice.actions;
