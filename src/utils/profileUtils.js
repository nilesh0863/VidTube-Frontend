import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addUserProfile,
  addUserVideos,
  addUserPlaylists,
} from "../features/userSlice";

class ProfileUtils {
  async fetchUserProfile(dispatch) {
    try {
      const url = "http://localhost:8000/api/v1/users/current-user";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      const result = response.data.data;
      // console.log(result);
      dispatch(addUserProfile(result));
    } catch (error) {
      console.error(error);
    }
  }
  async fetchUserVideos(dispatch) {
    try {
      const url = "http://localhost:8000/api/v1/videos/u/user-videos";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      const result = response.data.data;
      console.log(result);
      dispatch(addUserVideos(result));
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUserPlaylists(dispatch) {
    try {
      const url = "http://localhost:8000/api/v1/playlist/";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      if (response.data.success) {
        const result = response.data.data;
        dispatch(addUserPlaylists(result));
      } else {
        dispatch(addUserPlaylists([]));
      }

      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

const profileUtils = new ProfileUtils();
export default profileUtils;
