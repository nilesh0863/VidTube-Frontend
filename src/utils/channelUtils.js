import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addChannelPlaylists,
  addChannelProfile,
  addChannelVideos,
} from "../features/channelSlice";

class ChannelUtils {
  async fetchChannelProfile(dispatch, userId) {
    try {
      const url = `http://localhost:8000/api/v1/users/c/channel/${userId}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      console.log("channel: ", response.data);
      if (response.data.success) {
        dispatch(addChannelProfile(response.data.data));
      } else {
        dispatch(addChannelProfile({}));
      }
    } catch (error) {
      console.error(error);
    }
  }
  async fetchChannelVideos(dispatch, userId) {
    try {
      const url = `http://localhost:8000/api/v1/videos/?userId=${userId}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      console.log("videos: ", response.data);
      if (response.data.success) {
        dispatch(addChannelVideos(response.data.data.docs));
      } else {
        dispatch(addChannelVideos([]));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchChannelPlaylists(dispatch, userId) {
    try {
      const url = `http://localhost:8000/api/v1/playlist/p/${userId}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      console.log("playlist: ", response.data);
      if (response.data.success) {
        dispatch(addChannelPlaylists(response.data.data));
      } else {
        dispatch(addChannelPlaylists([]));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const channelUtils = new ChannelUtils();
export default channelUtils;
