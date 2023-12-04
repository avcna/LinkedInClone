import React, { useMemo, useState } from "react";
import "./index.scss";
import { month, date, year, hour, minute } from "../../../helpers/time";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { getUserByEmail } from "../../../api/fireStoreAPIs";

const PostCard = ({ id, status, timeStamp, currentUser, userEmail }) => {
  const [user, setUser] = useState("");
  useMemo(() => {
    getUserByEmail(setUser, localStorage.getItem("userEmail"));
  }, []);
  let navigate = useNavigate();
  return (
    <div className="posts-card">
      <p
        className="name"
        onClick={() => navigate("/profile", { state: { email: userEmail } })}
      >
        {currentUser}
      </p>
      <p className="timestamp">
        {month(timeStamp)} {date(timeStamp)}, {year(timeStamp)}{" "}
        {hour(timeStamp)}:{minute(timeStamp)}
      </p>
      <p className="status">{status}</p>
      <hr />
      <LikeButton
        userId={user[0]?.UserId}
        postId={id}
        currentUser={user[0]?.name}
      />
    </div>
  );
};

export default PostCard;
