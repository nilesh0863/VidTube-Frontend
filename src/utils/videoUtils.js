import React, { useEffect, useState } from "react";
import axios from "axios";
import { addVideos } from "../features/videoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addLikedVideos,
  addVideoCategory,
  addWatchHistory,
} from "../features/videoSlice";

class VideoUtil {
  async fetchHomeData(dispatch) {
    const videoListLocal = `http://localhost:8000/api/v1/videos/`;
    try {
      const response = await axios.get(videoListLocal);
      // setData(response.data.data.docs); // Assuming response.data.docs contains the video data
      dispatch(addVideos(response.data.data.docs));
      // console.log(response.data.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async fetchLikedVideos(dispatch) {
    try {
      const url = "http://localhost:8000/api/v1/like/b";
      // console.log(localStorage.getItem("accessToken"));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      const result = response.data.data;

      // setData(result);
      dispatch(addLikedVideos(result));
      // const data = useSelector((state) => state.video.videos);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchWatchHistory(dispatch) {
    try {
      const url = "http://localhost:8000/api/v1/users/watch-history";
      // console.log(localStorage.getItem("accessToken"));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(url, { headers });
      const result = response.data.data;

      // setData(result);
      dispatch(addWatchHistory(result));
      // const data = useSelector((state) => state.video.videos);
      // console.log("watch history ", result);
    } catch (error) {
      console.error(error);
    }
  }
}

const videoUtil = new VideoUtil();
export default videoUtil;
