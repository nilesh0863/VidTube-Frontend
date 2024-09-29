import React, { useEffect, useState } from "react";
import "./VideoDetail.css";
import user_profile from "../../assets/user_profile.jpg";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import axios from "axios";
import { Link } from "react-router-dom";

import { value_converter } from "../../data";
import moment from "moment";
const VideoDetail = ({ data }) => {
  const [isLiked, setIsLiked] = useState(data?.isLikedByUser || false);
  const [totalLikes, setTotalLikes] = useState(data?.totalLikes || 0);
  const [likeData, setLikeData] = useState(data);
  const [channelData, setChannelData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const fetchChannelProfile = async () => {
    const channelProfileUrl = `http://localhost:8000/api/v1/users/channel/${data?.owner.username}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.get(channelProfileUrl, { headers });
      if (response.data.success) {
        setChannelData(response.data.data);
        setIsSubscribed(response.data.data.isSubscribed);
        setSubscribersCount(response.data.data.subscribersCount);
        // console.log("channel Profile", response.data);
      }

      // console.log(isSubscribed);
      // console.log(subscribersCount);
    } catch (error) {
      console.error("Error while toggling like", error);
    }
  };

  useEffect(() => {
    if (data) {
      setIsLiked(data.isLikedByUser || false);
      setTotalLikes(data.totalLikes || 0);
      setLikeData(data);
      fetchChannelProfile();
    }
  }, [data]);

  const handleLike = async () => {
    const toggleLikeUrl = `http://localhost:8000/api/v1/like/${likeData._id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    try {
      const response = await axios.post(toggleLikeUrl, null, { headers });
      // console.log(response.data);

      if (response.data.success) {
        // Toggle the liked state and adjust total likes count
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setTotalLikes(newIsLiked ? totalLikes + 1 : totalLikes - 1);
      }
    } catch (error) {
      console.error("Error while toggling like", error);
    }
  };

  const handleSubscribe = async () => {
    // {{server}}/subscription/subscribe/:channelId
    const toggleSubscribeUrl = `http://localhost:8000/api/v1/subscription/subscribe/${channelData._id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.post(toggleSubscribeUrl, null, { headers });
      // console.log(response.data);

      if (response.data.success) {
        setIsSubscribed(!isSubscribed);
        setSubscribersCount(
          !isSubscribed ? subscribersCount + 1 : subscribersCount - 1
        );
      }
    } catch (error) {
      console.error("Error while toggling subscription", error);
    }
  };
  return (
    <div className="video-detail-container">
      <div className="title-div">
        <h3>{data?.title}</h3>
      </div>
      <div className="action-div">
        <div className="subscribe-div">
          <img src={data?.owner.avatar} alt="" />
          <div>
            <Link to={`/channel/${data?.owner._id}`}>
              <h4>{data?.owner.username}</h4>
              <p>{`${value_converter(subscribersCount)} Subscribers`}</p>
            </Link>
          </div>
          <button
            onClick={handleSubscribe}
            className={isSubscribed ? "subscribed" : "subscribe"}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="like-div">
          <div className="like-d">
            <img
              src={like}
              onClick={handleLike}
              className={isLiked ? "like-on" : ""}
              alt=""
            />
            <p>{totalLikes}</p>
          </div>
          <div>
            <img src={dislike} alt="" />
          </div>
          <div>
            <img src={share} alt="" />
          </div>
          <div>
            <img src={save} alt="" />
          </div>
        </div>
      </div>
      <hr />
      <div className="description-div">
        <div className="views-div">
          <p>{`${value_converter(data?.views)} Views  `}</p>
          <p>{` ${moment(data?.createdAt).fromNow()}`}</p>
        </div>
        <div className="disc">
          <p>{data?.description.slice(0, 250)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
