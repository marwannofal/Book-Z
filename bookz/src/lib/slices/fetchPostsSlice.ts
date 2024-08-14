import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPostsThunk";
import { Book } from "../../types/Book";
import { BookState } from "../../types/BookState";

const initialState: BookState = {
  posts: [],
  status: "idle",
  error: null,
};

const fetchPostsSlice = createSlice({
  name: "fetchPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(
        fetchPosts.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch posts";
        }
      );
  },
});

export default fetchPostsSlice.reducer;
