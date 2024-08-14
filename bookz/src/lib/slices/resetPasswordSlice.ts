import { createSlice } from "@reduxjs/toolkit";
import { resetUserPassword } from "../thunks/resetPasswordThunk";
import { UserState } from "../../types/UserState";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetUserPassword.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to reset password";
      });
  },
});

export default resetPasswordSlice.reducer;
