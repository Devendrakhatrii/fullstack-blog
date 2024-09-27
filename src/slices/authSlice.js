import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
  isLoadingAuth: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.authStatus = false;
      state.loading = false;
      state.userData = null;
    },
    authLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const authReducers = authSlice.reducer;
export const { login, logout, authLoading, setError } = authSlice.actions;
