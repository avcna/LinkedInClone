import React, { useMemo, useState, useEffect } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../pages/Profile";
import { getUserByEmail } from "../api/fireStoreAPIs";
import { useLocation } from "react-router-dom";

const ProfileLayout = () => {
  let location = useLocation();
  const [currentUser, setCurrentUser] = useState([{ name: "user", email: "" }]);
  useEffect(() => {
    if (location?.state?.email) {
      getUserByEmail(setCurrentUser, location.state.email);
    } else {
      getUserByEmail(setCurrentUser, localStorage.getItem("userEmail"));
    }
  }, []);
  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser[0]} />
    </div>
  );
};

export default ProfileLayout;
