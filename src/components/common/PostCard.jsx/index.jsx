import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { month, date, year, hour, minute } from "../../../helpers/time";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import {
  getAllUsers,
  getUserByEmail,
  getConnection,
} from "../../../api/fireStoreAPIs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const PostCard = ({
  id,
  status,
  timeStamp,
  currentUserName,
  currentUserId,
  userEmail,
  postUserId,
  editStatus,
  deleteStatus,
  showInHome,
  postImage,
}) => {
  const [user, setUser] = useState("");
  const [allUser, setAllUser] = useState([{ imageLink: "" }]);
  const [isConnected, setIsConnected] = useState("");

  useMemo(() => {
    getUserByEmail(setUser, localStorage.getItem("userEmail"));
    getAllUsers(setAllUser);
  }, []);
  useEffect(() => {
    getConnection(currentUserId, postUserId, setIsConnected);
  }, []);
  let navigate = useNavigate();
  return (
    <div className="posts-card">
      <div className="header">
        <div className="user-info">
          <div className="wrapper-profile-image">
            <img
              src={
                allUser?.filter((user) => user.id === postUserId)[0]?.imageLink
              }
              alt="tes"
              className="profile-image"
            />
          </div>
          <div className="wrapper-info">
            <p
              className="name"
              onClick={() =>
                navigate("/profile", { state: { email: userEmail } })
              }
            >
              {currentUserName}
            </p>
            <p className="timestamp">
              {month(timeStamp)} {date(timeStamp)}, {year(timeStamp)}{" "}
              {hour(timeStamp)}:{minute(timeStamp)}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={editStatus}
            className={`${
              userEmail !== localStorage.getItem("userEmail") && "visibility"
            } `}
          >
            <MdOutlineModeEditOutline />
          </button>
          <button
            onClick={deleteStatus}
            className={`${
              userEmail !== localStorage.getItem("userEmail") && "visibility"
            } `}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <p className="status">{status}</p>
      {postImage !== "" && <img width={"100%"} src={postImage} />}
      <hr />
      <LikeButton
        userId={user[0]?.UserId}
        postId={id}
        currentUser={user[0]?.name}
        foto={user[0]?.imageLink}
      />
    </div>
  );
};

export default PostCard;
