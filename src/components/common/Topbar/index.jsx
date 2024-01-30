import React, { useEffect, useState } from "react";
import "./index.scss";
import LinkedLogo from "../../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsBriefcase } from "react-icons/bs";
import { BiSearchAlt2, BiMessageDots, BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ProfilePopup } from "../ProfilePopup";
import { getAllUsers, getUserByEmail } from "../../../api/fireStoreAPIs";
import SearchUsers from "../SearchUsers";
import SearchResult from "../SearchResult";
const Topbar = () => {
  const [currentUser, setCurrentUser] = useState([{ name: "user", email: "" }]);
  const [allUser, setAllUser] = useState([]);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (search) => {
    const filteredUser = allUser.filter((user) => user.name == search);
    setFilteredUsers(filteredUser);
  };
  let navigate = useNavigate();
  useEffect(() => {
    getUserByEmail(setCurrentUser, localStorage.getItem("userEmail"));
    getAllUsers(setAllUser);
    handleSearch(search);
  }, [search]);

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
        {userVisibility && (
          <div className="user-list">
            {search.length > 0
              ? filteredUsers.map((user, i) => (
                  <SearchResult
                    key={i}
                    name={user.name}
                    imageLink={user?.imageLink}
                    email={user.email}
                    headline={user?.headline}
                  />
                ))
              : allUser.map((user, i) => (
                  <SearchResult
                    key={i}
                    name={user.name}
                    imageLink={user?.imageLink}
                    email={user.email}
                    headline={user?.headline}
                  />
                ))}
          </div>
        )}
        {userVisibility ? (
          <SearchUsers
            onCancel={displayUser}
            onChange={(e) => setSearch(e.target.value)}
          />
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
