import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginThunk";
import { UserState } from "../../types/UserState";
import { User } from "../../types/User";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to login";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
