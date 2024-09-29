import React, { useEffect } from "react";
import "./Feed.css";
import VideoCard from "../VideoCard/VideoCard";
import videoUtil from "../../utils/videoUtils";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.video.videoCategory);
  const videos = useSelector((state) => state.video.videos);
  const likedVideos = useSelector((state) => state.video.likedVideos);
  const watchHistory = useSelector((state) => state.video.watchHistory);

  // Fetch videos based on the category
  useEffect(() => {
    if (category === 0) {
      videoUtil.fetchHomeData(dispatch); // Fetch Home Videos
    } else if (category === 1) {
      videoUtil.fetchLikedVideos(dispatch); // Fetch Liked Videos
    } else if (category === 2) {
      videoUtil.fetchWatchHistory(dispatch);
    }
    // Add more conditions here for other categories like Watch History, Playlists, etc.
  }, [category, dispatch]);

  // Select the correct data based on the category
  const getData = () => {
    if (category === 0) return videos;
    if (category === 1) return likedVideos;
    if (category === 2) return watchHistory;
    // Add more conditions for other categories if needed
  };

  const data = getData();

  return (
    <div className="feed">
      {data?.map((item, index) => (
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
      ))}
    </div>
  );
};

export default Feed;
