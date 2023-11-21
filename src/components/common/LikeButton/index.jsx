import React, { useMemo, useState } from "react";
import "./index.scss";
import { BiLike,BiSolidLike } from "react-icons/bi";
import { getLikesByUser, likePost } from "../../../api/fireStoreAPIs";

const LikeButton = ({ userId, postId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = (userId, postId) => {
    likePost(userId, postId,isLiked);
  };

  useMemo(() => {
    getLikesByUser(userId, postId,setLikesCount, setIsLiked);
  }, [userId, postId]);
  return (
    <div className="wrapper">
      <button onClick={() => handleLike(userId, postId)}>
        {isLiked ? <BiSolidLike className="like-icon"/> : <BiLike/>}
      </button>
      <p>{likesCount}</p>
    </div>
  );
};

export default LikeButton;
