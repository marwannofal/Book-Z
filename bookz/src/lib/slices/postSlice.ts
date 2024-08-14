import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPost } from "../thunks/fetchPostThunk";
import { Book } from "../../types/Book";

interface PostState {
  post: Book | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  post: null,
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action: PayloadAction<Book>) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch post";
      });
  },
});

export default postSlice.reducer;
