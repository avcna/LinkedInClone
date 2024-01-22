import React, { useEffect, useState } from "react";
import "../Sass/ConnectionsComponent.scss";
import { getAllUsers } from "../api/fireStoreAPIs";

const ConnectionsComponent = ({ currentUser }) => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => getAllUsers(setAllUser), []);
  return (
    <div className="card">
      {allUser.map((user) => (
        <div className="card-item">
          <div className="wrapper-profile-image">
            {" "}
            <img src={user?.imageLink} alt="" className="profile-image" />
          </div>
          <p>{user?.name}</p>
          <p>{user?.headline}</p>
          <button>Connect</button>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsComponent;
