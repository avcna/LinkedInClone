import React, { useState } from "react";
import "../Sass/LoginComponent.scss";
import LinkedInLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../api/AuthAPI";
import { toast } from "react-toastify";

const LoginComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Signed In to LinkedIn");
      navigate("/");
    } catch (error) {
      toast.error("Please check your credentials");
      console.log(error);
    }
  };
  return (
    <div className="login-wrapper">
      <img className="linkedin-logo" src={LinkedInLogo} alt="" />
      <div className="wrapper">
        <div className="login-wrapper-inner">
          <h1 className="heading">Sign In</h1>
          <p className="sub-heading">Stay updated on your professional world</p>
          <div className="auth-inputs">
            <input
              type="email"
              className="common-input"
              placeholder="Email or Phone"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <input
              type="password"
              className="common-input"
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button onClick={login} className="login-btn">
            Sign In
          </button>
          <p className="go-to-signup">
            New to LinkedIn?{" "}
            <span className="join-now" onClick={() => navigate("/register")}>
              Join now
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
