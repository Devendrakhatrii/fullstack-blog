import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
  loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const authReducers = authSlice.reducer;
export const { login, logout, setLoading, setError } = authSlice.actions;
