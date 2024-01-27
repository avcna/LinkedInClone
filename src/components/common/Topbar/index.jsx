import React, { useEffect, useState } from "react";
import "./index.scss";
import LinkedLogo from "../../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsBriefcase } from "react-icons/bs";
import { BiSearchAlt2, BiMessageDots, BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ProfilePopup } from "../ProfilePopup";
import { getUserByEmail } from "../../../api/fireStoreAPIs";
import SearchUsers from "../SearchUsers";
const Topbar = () => {
  const [currentUser, setCurrentUser] = useState([{ name: "user", email: "" }]);
  let navigate = useNavigate();
  useEffect(
    () => getUserByEmail(setCurrentUser, localStorage.getItem("userEmail")),
    [],
  );
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);

  const displayPopup = () => {
    setPopupVisibility(!popupVisibility);
  };

  const displayUser = () => {
    setUserVisibility(!userVisibility);
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
        {userVisibility ? (
          <SearchUsers onCancel={displayUser} />
        ) : (
          <>
            <BiSearchAlt2
              size={30}
              className="react-icon"
              onClick={displayUser}
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
          </>
        )}
      </div>
      <div className="wrapper-profile-logo">
        <img
          className="profile-logo"
          src={currentUser[0]?.imageLink}
          alt="linkedin"
          onClick={displayPopup}
        />
      </div>
    </div>
  );
};

export default Topbar;
