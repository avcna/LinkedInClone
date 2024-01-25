import React, { useEffect } from "react";
import "./index.scss";
import { addConnection, getConnection } from "../../../api/fireStoreAPIs";
import { toast } from "react-toastify";

const ConnectionCard = ({ userId, id, imageLink, name, headline }) => {
  const connectTo = (targetId) => {
    addConnection(userId, targetId);
    toast.success("Connection Added!");
  };
  return (
    <div className="card-item" hidden={userId == id}>
      <div className="wrapper-profile-image">
        {" "}
        <img src={imageLink} alt="" className="profile-image" />
      </div>
      <p>{name}</p>
      <p>{headline}</p>
      <button onClick={() => connectTo(id)}>Connect</button>
    </div>
  );
};

export default ConnectionCard;
