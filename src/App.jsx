import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp";
import RefreshHandler from "./Components/RefreshHandler";
import { useLocation } from "react-router-dom";
import LikedVideo from "./Pages/LikedVideo/LikedVideo";
import UserProfile from "./Pages/Profile/UserProfile.jsx";
import ChannelProfile from "./Pages/Channel/ChannelProfile.jsx";
import Upload from "./Pages/Upload/Upload.jsx";

const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const location = useLocation();

  const toggleSidebar = () => {
    console.log("in toggle func");
    if (sidebar) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  // console.log(userProfile);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      {showNavbar && (
        <Navbar userProfile={userProfile} toggleSidebar={toggleSidebar} />
      )}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route
          path="/"
          element={<PrivateRoute element={<Home sidebar={sidebar} />} />}
        />
        <Route
          path="/login"
          element={<Login setUserProfile={setUserProfile} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/liked-videos"
          element={<LikedVideo sidebar={sidebar} />}
        />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/channel/:userId" element={<ChannelProfile />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default App;
