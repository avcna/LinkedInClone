import React, { useState, useMemo } from "react";
import { getPostStatusByEmail } from "../../../api/fireStoreAPIs";
import "./index.scss";
import PostCard from "../PostCard.jsx";

const ProfileCard = ({ currentUser, onEdit }) => {
  const [allStatus, setAllStatus] = useState([]);
  useMemo(() => getPostStatusByEmail(setAllStatus), []);
  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <button onClick={onEdit}>edit</button>
        </div>
        <div className="profile-info">
          <div>
            <h3 className="username">{currentUser.name}</h3>
            <p className="headline">{currentUser?.headline}</p>
            <p className="headline">{currentUser?.location}</p>
          </div>
          <div className="right-info">
            <p className="">{currentUser?.college}</p>
            <p className="">{currentUser?.company}</p>
          </div>
        </div>
      </div>
      <div className="post-status-main">
        <div>
          {allStatus.map((status, i) => {
            return (
              <PostCard
                currentUser={status.currentUser}
                key={i}
                status={status.status}
                timeStamp={status.timeStamp}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
