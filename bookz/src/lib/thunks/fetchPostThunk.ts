import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Book } from "../../types/Book";

export const fetchPost = createAsyncThunk<Book, string>(
  "post/fetchPost",
  async (postId) => {
    const response = await api.get(`/books/${postId}`);
    return response.data;
  }
);
