import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/books/delete/${postId}`, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 204) {
        return postId;
      } else {
        return rejectWithValue("Error deleting post");
      }
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
