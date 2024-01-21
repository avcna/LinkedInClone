import React, { useState } from "react";
import "./index.scss";
import LinkedLogo from "../../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsBriefcase } from "react-icons/bs";
import { BiSearchAlt2, BiMessageDots, BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ProfilePopup } from "../ProfilePopup";
const Topbar = ({ currentUser }) => {
  let navigate = useNavigate();

  const [popupVisibility, setPopupVisibility] = useState(false);

  const displayPopup = () => {
    setPopupVisibility(!popupVisibility);
  };

  const goToRoute = (route) => {
    navigate(route);
  };
  return (
    <div className="topbar-main">
      {popupVisibility && (
        <div className="popup-profile">
          <ProfilePopup />
        </div>
      )}

      <img className="linkedin-logo" src={LinkedLogo} alt="linkedin" />
      <div className="react-icons">
        <BiSearchAlt2
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/")}
        />
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/")}
        />
        <FiUsers
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/connections")}
        />
        <BsBriefcase
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/")}
        />
        <BiMessageDots
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/")}
        />
        <BiBell
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/")}
        />
      </div>
      <div className="wrapper-profile-logo">
        <img
          className="profile-logo"
          src={currentUser?.imageLink}
          alt="linkedin"
          onClick={displayPopup}
        />
      </div>
    </div>
  );
};

export default Topbar;
