import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupUser } from "../thunks/signupThunk";
import { UserState } from "../../types/UserState";
import { User } from "../../types/User";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to sign up";
      });
  },
});

export default signupSlice.reducer;
