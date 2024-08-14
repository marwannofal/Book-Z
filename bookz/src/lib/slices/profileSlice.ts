import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadProfilePhoto } from "../thunks/uploadProfilePhotoThunk";

interface ProfileState {
  profilePhoto: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  profilePhoto: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      state.profilePhoto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profilePhoto = action.payload;
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setProfilePhoto } = profileSlice.actions;
export default profileSlice.reducer;
