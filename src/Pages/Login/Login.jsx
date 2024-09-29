import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import { loginSuccess } from "../../features/authSlice";
import { useDispatch } from "react-redux";
const Login = ({ setUserProfile }) => {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8000/api/v1/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      const { success, message, data } = result;

      if (success) {
        handleSuccess(message);
        dispatch(loginSuccess(data));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("loggedInUser", data.user.username);
        localStorage.setItem("avatar", data.user.avatar);
        navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };
  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} action="">
        <div>
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            type="text"
            name="email"
            onChange={handleChange}
            value={loginInfo.email}
            placeholder="Enter Your Email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={loginInfo.password}
            placeholder="Enter Your Password..."
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <span>
          New User ?<Link to="/signup">SignUp</Link>`
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
