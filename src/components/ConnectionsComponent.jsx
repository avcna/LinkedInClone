import React, { useEffect, useState } from "react";
import ConnectionCard from "./common/Connection";
import { getAllUsers } from "../api/fireStoreAPIs";
import "../Sass/ConnectionsComponent.scss";

const ConnectionsComponent = ({ currentUser }) => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    getAllUsers(setAllUser);
  }, []);
  return (
    <div className="card">
      {allUser.map((user) => (
        <ConnectionCard
          key={user.id}
          userId={currentUser?.UserId}
          id={user?.id}
          name={user?.name}
          imageLink={user?.imageLink}
          headline={user?.headline}
        />
      ))}
    </div>
  );
};

export default ConnectionsComponent;
