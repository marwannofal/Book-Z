import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface RatingData {
  userId: string;
  rating: number;
  comment: string;
}

export const rateUser = createAsyncThunk<void, RatingData>(
  "rating/rateUser",
  async ({ userId, rating, comment }, { rejectWithValue }) => {
    try {
      await api.post(`/users/ratings/${userId}`, { rating, comment });
    } catch (error) {
      return rejectWithValue("Failed to submit rating");
    }
  }
);
