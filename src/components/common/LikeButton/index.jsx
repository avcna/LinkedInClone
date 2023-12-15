import React, { useMemo, useState } from "react";
import "./index.scss";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import {
  getLikesByUser,
  likePost,
  postComment,
  getComment,
} from "../../../api/fireStoreAPIs";
import { IoSendSharp } from "react-icons/io5";

const LikeButton = ({ userId, postId, currentUser }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const handleLike = () => {
    likePost(userId, postId, isLiked);
  };
  const getComments = (event) => {
    setComment(event.target.value);
  };
  const addComment = () => {
    postComment(postId, comment, currentUser);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLikesCount, setIsLiked);
    getComment(postId, setListComment);
  }, [userId, postId]);
  return (
    <>
      <div className="wrapper">
        <button onClick={handleLike}>
          {isLiked ? <BiSolidLike className="like-icon" /> : <BiLike />}
        </button>
        <p>{likesCount}</p>
        <button onClick={() => setShowComment(!showComment)}>
          <FaRegCommentDots />
        </button>
      </div>
      {showComment && (
        <>
          <div className="comment-wrapper">
            <input
              className="comment-input"
              type="text"
              placeholder="Add Comment"
              onChange={(e) => getComments(e)}
              name="comment"
              value={comment}
            />
            <button className="submit-btn" onClick={addComment}>
              <IoSendSharp />
            </button>
          </div>
          <div className="comment-card-wrapper">
            {listComment?.map((c) => (
              <div className="comment-card">
                <h4>{c.name}</h4>
                <p>{c.comment} </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default LikeButton;
