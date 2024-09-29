import React, { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsAuthenticated(true);
      if (
        // location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
};

export default RefreshHandler;
