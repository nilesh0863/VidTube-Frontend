import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: {},
    userVideos: [],
    userPlaylist: [],
  },
  reducers: {
    addUserProfile: (state, action) => {
      state.userProfile = {};
      state.userProfile = action.payload;
    },
    addUserVideos: (state, action) => {
      state.userVideos = [];
      state.userVideos = action.payload;
    },
    addUserPlaylists: (state, action) => {
      state.userPlaylist = [];
      state.userPlaylist = action.payload;
    },
  },
});

export const { addUserPlaylists, addUserProfile, addUserVideos } =
  userSlice.actions;

export default userSlice.reducer;
