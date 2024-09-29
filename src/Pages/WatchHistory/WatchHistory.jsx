import React, { useEffect, useState } from "react";
import "./WatchHistory.css";
import axios from "axios";
import VideoCard from "../../Components/VideoCard/VideoCard";
const WatchHistory = () => {
  const [data, setData] = useState([]);

  const fetchWatchHistory = async () => {
    try {
      const url = "";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchWatchHistory();
  }, []);
  return (
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
          />
        );
      })}
    </div>
  );
};

export default WatchHistory;
