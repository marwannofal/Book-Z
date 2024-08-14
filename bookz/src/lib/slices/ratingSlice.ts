import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rateUser } from "../thunks/rateUserThunk";

interface RatingState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RatingState = {
  status: "idle",
  error: null,
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(rateUser.rejected, (state, action: PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ratingSlice.reducer;
