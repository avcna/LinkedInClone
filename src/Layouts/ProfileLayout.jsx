import React, { useMemo, useState, useEffect } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../pages/Profile";
import { getCurrentUser } from "../api/fireStoreAPIs";

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState([{ name: "user", email: "" }]);
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser[0]} />
    </div>
  );
};

export default ProfileLayout;
