import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import HomeComponent from "../components/HomeComponent";
import ConnectionsComponent from "../components/ConnectionsComponent";

const Connections = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <ConnectionsComponent currentUser={currentUser} />
  );
};

export default Connections;
