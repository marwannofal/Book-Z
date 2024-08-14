import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const resetUserPassword = createAsyncThunk(
  "resetPassword/resetUserPassword",
  async ({
    newPassword,
    username,
  }: {
    newPassword: string;
    username: string;
  }) => {
    try {
      const response = await api.post("/users/reset/password", {
        newPassword,
        username,
      });
      return response.data;
    } catch (error) {
      return { success: false };
    }
  }
);
