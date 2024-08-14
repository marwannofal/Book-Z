import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Book } from "../../types/Book";

export const createPost = createAsyncThunk<Book, FormData>(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const userId = formData.get("userId") as string;
      const response = await api.post<Book>(`users/books/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create post");
    }
  }
);
