import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import axios from "axios";
import VideoDetail from "../VideoDetail/VideoDetail";
import VideoComment from "../VideoComment/VideoComment";

const PlayVideo = ({ videoId }) => {
  const [data, setData] = useState(null);
  // const [commentData, setCommentData] = useState([]);

  const addVideoView = async () => {
    const url = `http://localhost:8000/api/v1/videos/add-view/${videoId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.post(url, null, { headers });
      // Assuming response.data.docs contains the video data
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToWatchHistory = async () => {
    const url = `http://localhost:8000/api/v1/users/watch-history/${videoId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.post(url, null, { headers });
      // Assuming response.data.docs contains the video data
      // console.log("watch history added response", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideoData = async () => {
    const videoListLocal = `http://localhost:8000/api/v1/videos/${videoId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.get(videoListLocal, { headers });
      setData(response.data.data[0]); // Assuming response.data.docs contains the video data
      // console.log(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchCommentData = async () => {
  //   const videoListLocal = `http://localhost:8000/api/v1/comment/${videoId}`;

  //   try {
  //     const response = await axios.get(videoListLocal);
  //     setCommentData(response.data.data.docs); // Assuming response.data.docs contains the video data
  //     console.log(response.data.data.docs);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    addVideoView();
    addToWatchHistory();
  }, []);

  return (
    <div className="play-video">
      <video src={data?.videoFile} controls autoPlay muted></video>
      <VideoDetail data={data} />

      <hr />
      {/* <VideoComment commentData={commentData} videoId={videoId} /> */}
      <VideoComment videoId={videoId} />
    </div>
  );
};

export default PlayVideo;
