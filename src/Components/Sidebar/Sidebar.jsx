import React, { useState } from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import { GoHistory } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { addVideoCategory } from "../../features/videoSlice";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.video.videoCategory);

  const setVideoCategory = (categ) => {
    dispatch(addVideoCategory(categ));
  };
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="sortcut-links">
        <div
          onClick={() => setVideoCategory(0)}
          className={`side-link ${category === 0 ? "active" : ""}`}
        >
          <GoHome className="icon" />
          <p>Home</p>
        </div>
        <div
          onClick={() => setVideoCategory(1)}
          className={`side-link ${category === 1 ? "active" : ""}`}
        >
          <AiOutlineLike className="icon" />
          <p>Liked Videos</p>
        </div>

        <div
          onClick={() => setVideoCategory(2)}
          className={`side-link ${category === 2 ? "active" : ""}`}
        >
          <GoHistory className="icon" />
          <p>Watch History</p>
        </div>

        <NavLink
          to="/user-profile"
          className={({ isActive }) =>
            isActive ? "side-link active" : "side-link"
          }
        >
          <RiPlayList2Fill className="icon" />
          <p>Playlists</p>
        </NavLink>

        <NavLink
          to="/user-profile"
          className={({ isActive }) =>
            isActive ? "side-link active" : "side-link"
          }
        >
          <BiSolidVideos className="icon" />

          <p>Your Videos</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
