import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface UploadPhotoPayload {
  userId: number;
  file: File;
}

export const uploadProfilePhoto = createAsyncThunk<string, UploadPhotoPayload>(
  "profile/uploadProfilePhoto",
  async ({ userId, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post(
        `/users/uploaduserphoto/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        return response.data.imageUrl; // Assuming the API returns an imageUrl
      } else {
        return rejectWithValue("Error uploading photo");
      }
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
