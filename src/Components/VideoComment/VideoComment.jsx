import React, { useEffect, useState } from "react";
import "./VideoComment.css";
import { value_converter } from "../../data";
import moment from "moment";
import like from "../../assets/like.png";

import dislike from "../../assets/dislike.png";
import axios from "axios";
const VideoComment = ({ videoId }) => {
  const [commentData, setCommentData] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchCommentData = async () => {
    const videoListLocal = `http://localhost:8000/api/v1/comment/${videoId}`;

    try {
      const response = await axios.get(videoListLocal);
      setCommentData(response.data.data.docs); // Assuming response.data.docs contains the video data
      // console.log(response.data.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
    // console.log(e.target.value);
  };
  const handleAddComment = async () => {
    // console.log(commentText);
    const data = {
      content: commentText,
    };
    const addCommentUrl = `http://localhost:8000/api/v1/comment/add/${videoId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.post(addCommentUrl, data, { headers });
      // console.log(response.data);
      setCommentText("");
      fetchCommentData();
    } catch (error) {
      console.log("Error while adding comment", error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [videoId]);

  return (
    <div>
      <h4>{`${value_converter(2001)} Comments`}</h4>
      <div className="add-comment-div">
        <img src={localStorage.getItem("avatar")} alt="" />
        <input
          placeholder="Add a comment "
          type="text"
          value={commentText}
          onChange={handleChange}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>
      {/* <hr /> */}

      {commentData?.map((item, index) => {
        return (
          <div key={index} className="comment">
            <img src={item.owner.avatar || user_profile} alt="" />
            <div>
              <h3>
                {item?.owner.username}{" "}
                <span>{moment(item?.createdAt).fromNow()}</span>
              </h3>
              <p>{item?.content}</p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{value_converter(10)}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoComment;
