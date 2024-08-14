import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePost } from "../thunks/deletePostThunk";
import { Book } from "../../types/Book";

interface PostsState {
  posts: Book[];
  userPosts: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  userPosts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Book[]>) => {
      state.posts = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Book[]>) => {
      state.userPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.userPosts = state.userPosts.filter(
          (post) => post.id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPosts, setUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
