import React, { useEffect, useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
const Navbar = ({ toggleSidebar, userProfile }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = (e) => {
    localStorage?.removeItem("accessToken");
    localStorage?.removeItem("refreshToken");
    localStorage?.removeItem("loggedInUser");
    localStorage?.removeItem("avatar");
    handleSuccess("User LoggedOut");
    setLoggedInUser("");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleProfileClick = () => {
    // console.log("user: ", user);
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown") && !e.target.closest(".user-icon")) {
        // Close the dropdown only if the click is outside the dropdown or profile icon
        setShowDropdown(false);
      }
    };

    // Add event listener on the capture phase
    document.addEventListener("click", handleClickOutside, true);

    // Cleanup the event listener on component unmount
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);
  return (
    <>
      <nav className="flex-div">
        <div className="nav-left flex-div">
          <img
            className="menu-icon"
            onClick={toggleSidebar}
            src={menu_icon}
            alt=""
          />
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div className="nav-middle flex-div">
          <div className="search-box flex-div">
            <input type="text" placeholder="Search" />
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="nav-right flex-div">
          <Link to="/upload">
            <img src={upload_icon} alt="" />
          </Link>

          <img src={more_icon} alt="" />
          <img src={notification_icon} alt="" />
          {/* <div> */}
          <img
            className="user-icon"
            onClick={handleProfileClick}
            src={localStorage.getItem("avatar") || profile_icon}
            alt=""
          />

          <div className={showDropdown ? `dropdown` : `cln`}>
            <Link to="/user-profile" className="dropdown-item">
              Profile
            </Link>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {showDropdown && (
            <div className="dropdown">
              <Link to="/user-profile" className="dropdown-item">
                Profile
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
