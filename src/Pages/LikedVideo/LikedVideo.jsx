import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../Components/VideoCard/VideoCard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addLikedVideos } from "../../features/videoSlice";
import videoUtil from "../../utils/videoUtils";

const LikedVideo = ({ sidebar }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.video.likedVideos);
  // console.log(data);

  useEffect(() => {
    videoUtil.fetchLikedVideos(dispatch);
  }, []);
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <h3>Liked Videos</h3>
        <hr />
        <div className="feed">
          {data?.map((item, index) => {
            return (
              <VideoCard
                key={index}
                videoId={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                username={item.owner.username}
                views={item.views}
                createdAt={item.createdAt}
                avatar={item.owner.avatar}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikedVideo;
