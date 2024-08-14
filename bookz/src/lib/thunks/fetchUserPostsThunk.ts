import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { User } from "../../types/User";

export const fetchUserPosts = createAsyncThunk<User, string>(
  "fetchUserPosts/fetchUserPosts",
  async (userId: string) => {
    try {
      const response = await api.get<User>(`/users/withall/${userId}`);
      return response.data;
    } catch (error) {
      return {
        id: 0,
        username: "dummy",
        email: "dummy@example.com",
        phoneNumber: "0000000000",
        password: null,
        image: null,
        averageRating: 0,
        token: null,
        books: [],
        ratings: [],
      };
    }
  }
);
