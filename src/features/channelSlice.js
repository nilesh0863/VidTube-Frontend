import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channelProfile: {},
    channelVideos: [],
    channelPlaylists: [],
  },
  reducers: {
    addChannelProfile(state, action) {
      state.channelProfile = {};
      state.channelProfile = action.payload;
    },
    addChannelVideos(state, action) {
      state.channelVideos = [];
      state.channelVideos = action.payload;
    },
    addChannelPlaylists(state, action) {
      state.channelPlaylists = [];
      state.channelPlaylists = action.payload;
    },
  },
});

export const { addChannelPlaylists, addChannelProfile, addChannelVideos } =
  channelSlice.actions;
export default channelSlice.reducer;
