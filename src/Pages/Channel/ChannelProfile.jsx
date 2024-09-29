import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChannelProfile.css";
import VideoCard from "../../Components/VideoCard/VideoCard";
import PlaylistCard from "../../Components/PlaylistCard/PlaylistCard";
import profileUtils from "../../utils/profileUtils";
import channelUtils from "../../utils/channelUtils";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChannelProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("videos");
  const dispatch = useDispatch();
  const channelDetails = useSelector((state) => state.channel.channelProfile);
  const videos = useSelector((state) => state.channel.channelVideos);
  const playlists = useSelector((state) => state.channel.channelPlaylists);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  //   console.log("playlists:", playlists);

  useEffect(() => {
    channelUtils.fetchChannelProfile(dispatch, userId);
    channelUtils.fetchChannelVideos(dispatch, userId);
    channelUtils.fetchChannelPlaylists(dispatch, userId);
  }, []);

  useEffect(() => {
    setIsSubscribed(channelDetails.isSubscribed);
    setSubscribersCount(channelDetails.subscribersCount);
  }, [channelDetails]);

  const handleSubscribe = async () => {
    // {{server}}/subscription/subscribe/:channelId
    const toggleSubscribeUrl = `http://localhost:8000/api/v1/subscription/subscribe/${channelDetails._id}`;
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
    <div className="channel-profile">
      {/* Channel Header */}
      <div className="channel-header">
        <img
          src={channelDetails.coverImage || "default-cover.jpg"}
          alt="Channel Banner"
          className="channel-banner"
        />
        <div className="channel-info">
          <img
            src={channelDetails.avatar || "default-avatar.jpg"}
            alt="Channel Avatar"
            className="channel-avatar"
          />
          <div>
            <h2>{channelDetails.username}</h2>
            <p>{subscribersCount} subscribers</p>
          </div>
          <div>
            <button
              onClick={handleSubscribe}
              className={isSubscribed ? "subscribed" : "subscribe"}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Channel Tabs */}
      <div className="channel-tabs">
        <button
          className={activeTab === "videos" ? "active-tab" : ""}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={activeTab === "playlists" ? "active-tab" : ""}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
      </div>
      <hr />

      {/* Channel Content */}
      <div className="channel-content">
        {activeTab === "videos" && (
          <div className="video-section">
            {videos?.map((video) => (
              <VideoCard
                key={video._id}
                videoId={video._id}
                thumbnail={video.thumbnail}
                title={video.title}
                username={video.owner.username}
                views={video.views}
                createdAt={video.createdAt}
                avatar={video.owner.avatar}
              />
            ))}
          </div>
        )}

        {activeTab === "playlists" && (
          <div className="playlist-section">
            {playlists?.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlistId={playlist._id}
                thumbnail={playlist.thumbnail}
                title={playlist.name}
                videoCount={playlist.videosCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelProfile;
