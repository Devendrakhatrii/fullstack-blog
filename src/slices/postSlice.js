import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  userPost: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    getPost: (state, action) => {
      state.userPost = action.payload;
    },
  },
});

export const postReducers = postSlice.reducer;
export const { getPost, getPosts } = postSlice.actions;
