import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserPosts } from "../thunks/fetchUserPostsThunk";
import { FetchUserState } from "../../types/UserState";
import { User } from "../../types/User";

const initialState: FetchUserState = {
  fetchedUser: null,
  status: "idle",
  error: null,
};

const fetchUserPostsSlice = createSlice({
  name: "fetchUserPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.fetchedUser = action.payload;
        }
      )
      .addCase(fetchUserPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch user posts";
      });
  },
});

export default fetchUserPostsSlice.reducer;
