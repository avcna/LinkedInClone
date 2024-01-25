import React, { useEffect, useMemo, useState } from "react";
import Topbar from "../components/common/Topbar";
import { getUserByEmail } from "../api/fireStoreAPIs";
import Connections from "../pages/Connections";

const ConnectionLayout = () => {
  const [currentUser, setCurrentUser] = useState([{ name: "", email: "" }]);
  useMemo(() => {
    getUserByEmail(setCurrentUser, localStorage.getItem("userEmail"));
  }, []);

  return (
    <div>
      <Topbar />
      <Connections currentUser={currentUser[0]} />
    </div>
  );
};

export default ConnectionLayout;
