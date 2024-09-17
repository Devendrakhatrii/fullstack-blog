import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "../slices/authSlice";
import { postReducers } from "@/slices/postSlice";

const store = configureStore({
  reducer: { auth: authReducers, post: postReducers },
});

export default store;
