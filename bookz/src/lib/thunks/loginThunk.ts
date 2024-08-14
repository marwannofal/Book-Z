import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { User } from "../../types/User";

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string }
>("login/loginUser", async (credentials) => {
  try {
    const response = await api.post<User>("/account/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
});
