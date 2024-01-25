import React, { useEffect, useMemo, useState } from "react";
import Topbar from "../components/common/Topbar";
import Home from "../pages/Home";
import { getUserByEmail } from "../api/fireStoreAPIs";

const HomeLayout = () => {
  const [currentUser, setCurrentUser] = useState([{ name: "", email: "" }]);
  useMemo(() => {
    getUserByEmail(setCurrentUser, localStorage.getItem("userEmail"));
  }, []);

  return (
    <div>
      <Topbar />
      <Home currentUser={currentUser[0]} />
    </div>
  );
};

export default HomeLayout;
