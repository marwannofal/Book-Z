import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPost } from "../thunks/createPostThunk";
import { BookState } from "../../types/BookState";
import { Book } from "../../types/Book";

const initialState: BookState = {
  posts: [],
  // userPosts: {
  //   id: 0,
  //   username: "Guest",
  //   email: "guest@example.com",
  //   phoneNumber: "0000000000",
  //   password: "dummyPassword",
  //   image: null,
  //   averageRating: 0,
  //   token: null,
  //   books: [],
  //   ratings: [],
  // },
  status: "idle",
  error: null,
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Book>) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default createPostSlice.reducer;
