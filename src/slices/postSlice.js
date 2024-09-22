import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  // userPosts: {},
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action) => {
      state.allPosts = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setPosts, setUserPosts, setError } =
  postSlice.actions;

export const postReducers = postSlice.reducer;
