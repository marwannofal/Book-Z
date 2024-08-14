import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Book } from "../../types/Book";

export const fetchPosts = createAsyncThunk<
  Book[],
  void,
  { rejectValue: string }
>("fetchPosts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Book[]>("/books");
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch posts from the API.");
  }
});
