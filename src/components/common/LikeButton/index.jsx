import React, { useMemo, useState } from "react";
import "./index.scss";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { getLikesByUser, likePost } from "../../../api/fireStoreAPIs";
import { IoSendSharp } from "react-icons/io5";

const LikeButton = ({ userId, postId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleLike = (userId, postId) => {
    likePost(userId, postId, isLiked);
  };
  const handleComment = (userId, postId) => {};

  useMemo(() => {
    getLikesByUser(userId, postId, setLikesCount, setIsLiked);
  }, [userId, postId]);
  return (
    <>
      <div className="wrapper">
        <button onClick={() => handleLike(userId, postId)}>
          {isLiked ? <BiSolidLike className="like-icon" /> : <BiLike />}
        </button>
        <p>{likesCount}</p>
        <button
          onClick={() => {
            handleComment(userId, postId);
            setShowComment(!showComment);
          }}
        >
          <FaRegCommentDots />
        </button>
      </div>
      {showComment && (
        <div className="comment-wrapper">
          <input
            className="comment-input"
            type="text"
            placeholder="Add Comment"
          />
          <button className="submit-btn">
            <IoSendSharp />
          </button>
        </div>
      )}
    </>
  );
};

export default LikeButton;
