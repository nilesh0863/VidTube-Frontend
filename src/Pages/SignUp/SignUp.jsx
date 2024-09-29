import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./SignUp.css";
import { handleError, handleSuccess } from "../../utils";
const SignUp = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, fullName, password } = signupInfo;
    if (!username || !email || !password || !fullName) {
      return handleError("All fields are Required");
    }
    try {
      const url = "http://localhost:8000/api/v1/users/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  console.log("signup-info: ", signupInfo);
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup} action="">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={signupInfo.username}
            autoFocus
            placeholder="Enter Your Username..."
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={signupInfo.email}
            placeholder="Enter Your Email..."
          />
        </div>
        <div>
          <label htmlFor="fullName">FullName</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={signupInfo.fullName}
            placeholder="Enter Your Full Name..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={signupInfo.password}
            placeholder="Enter Your Password..."
          />
        </div>
        <button type="submit">SignUp</button>
        <span>
          Already have an Account ?<Link to="/login">Login</Link>`
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
