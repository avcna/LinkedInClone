import React, { useState } from "react";
import { RegisterAPI, GoogleSigninAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";
import LinkedInLogo from "../assets/logo.png";
import GoogleButton from "react-google-button";
import { postUserData } from "../api/fireStoreAPIs";
import { toast } from "react-toastify";

const RegisterComponent = () => {
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      postUserData({ name: credentials.name, email: credentials.email });
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Registered In to LinkedIn");
    } catch (error) {
      toast.error("Please check your credentials");
      console.log(error);
    }
  };
  const googleSignin = async () => {
    let response = await GoogleSigninAPI();
    console.log(response);
  };
  return (
    <div className="login-wrapper">
      <img className="linkedin-logo" src={LinkedInLogo} alt="" />
      <div className="wrapper">
        <div className="login-wrapper-inner">
          <h1 className="heading">Make the most of your professional life</h1>

          <div className="flex">
            <div className="auth-inputs">
              {" "}
              <p className="sub-heading">
                Stay updated on your professional world
              </p>
              <input
                type="text"
                className="common-input"
                placeholder="Your Name"
                onChange={(e) =>
                  setCredentials({ ...credentials, name: e.target.value })
                }
              />
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
              <button onClick={login} className="login-btn">
                Agree & Join
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="wrapper">
        <div className="google-btn-container">
          <GoogleButton
            className="google-btn"
            onClick={() => {
              googleSignin();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
