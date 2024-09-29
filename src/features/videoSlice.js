import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    likedVideos: [],
    videoCategory: 0,
    watchHistory: [],
  },
  reducers: {
    addVideos: (state, action) => {
      state.videos = [];
      state.videos = action.payload;
    },
    addLikedVideos: (state, action) => {
      state.likedVideos = [];
      state.likedVideos = action.payload;
    },
    addVideoCategory: (state, action) => {
      state.videoCategory = action.payload;
    },
    addWatchHistory: (state, action) => {
      state.watchHistory = [];
      state.watchHistory = action.payload;
    },
  },
});

export const { addVideos, addLikedVideos, addVideoCategory, addWatchHistory } =
  videoSlice.actions;
export default videoSlice.reducer;
