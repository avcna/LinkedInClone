import React from "react";
import "./index.scss";
import { month, date, year, hour, minute } from "../../../helpers/time";
import { useNavigate } from "react-router-dom";

const PostCard = ({ status, timeStamp, currentUser }) => {
  let navigate = useNavigate();
  return (
    <div className="posts-card">
      <p className="name" onClick={()=> navigate("profile")}>{currentUser}</p>
      <p className="timestamp">
        {month(timeStamp)} {date(timeStamp)}, {year(timeStamp)}{" "}
        {hour(timeStamp)}:{minute(timeStamp)}
      </p>
      <p className="status">{status}</p>
    </div>
  );
};

export default PostCard;
