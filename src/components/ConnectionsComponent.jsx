import React, { useEffect, useState } from "react";
import "../Sass/ConnectionsComponent.scss";
import { addConnection, getAllUsers } from "../api/fireStoreAPIs";

const ConnectionsComponent = ({ currentUser }) => {
  const [allUser, setAllUser] = useState([]);
  const connectTo = (id) => {
    addConnection(currentUser?.UserId, id);
  };
  useEffect(() => getAllUsers(setAllUser), []);
  return (
    <div className="card">
      {allUser.map((user) => (
        <div className="card-item" hidden={currentUser?.UserId == user.id}>
          <div className="wrapper-profile-image">
            {" "}
            <img src={user?.imageLink} alt="" className="profile-image" />
          </div>
          <p>{user?.name}</p>
          <p>{user?.headline}</p>
          <button onClick={() => connectTo(user?.id)}>Connect</button>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsComponent;
