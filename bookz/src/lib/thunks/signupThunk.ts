import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { User } from "../../types/User";

export const signupUser = createAsyncThunk<
  User,
  { username: string; email: string; phoneNumber: string; password: string }
>("signup/signupUser", async (credentials) => {
  try {
    const response = await api.post<User>("/account/register", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Signup failed. Please try again.");
  }
});
