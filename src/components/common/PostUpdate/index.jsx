import { useState, useMemo, useEffect } from "react";
import React from "react";
import "./index.scss";
import ModalComponent from "../Modal";
import {
  PostStatusAPI,
  getPostStatus,
  editStatus,
  deleteStatus,
  getConnection,
} from "../../../api/fireStoreAPIs";
import PostCard from "../PostCard.jsx";

const PostStatus = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  // const [isConnected, setIsConnected] = useState("");

  const sendStatus = async () => {
    if (isEdit) {
      await editStatus(currentPost.id, status);
    } else {
      await PostStatusAPI(status, currentUser);
    }
    await setModalOpen(false);
    await setStatus("");
  };
  const editStatusHandle = (post) => {
    setStatus(post.status);
    setModalOpen(true);
    setIsEdit(true);
    setCurrentPost(post);
  };

  const handleDelete = (id) => {
    deleteStatus(id);
  };
  useMemo(() => {
    getPostStatus(setAllStatus);
  }, []);

  return (
    <div className="base">
      <div>
        <div className="post-status">
          <button
            className="open-post-modal"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Start a Post{" "}
          </button>
          <ModalComponent
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            status={status}
            setStatus={setStatus}
            sendStatus={sendStatus}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
        <div>
          {allStatus.map((status, i) => {
            const setIsConnected = (bool) => {
              return bool;
            };
            getConnection(
              currentUser.UserId,
              status.postUserId,
              setIsConnected
            );

            return (
              setIsConnected && (
                <PostCard
                  currentUserName={status.currentUser}
                  currentUserId={currentUser.UserId}
                  key={i}
                  status={status.status}
                  timeStamp={status.timeStamp}
                  userEmail={status.userEmail}
                  id={status.postId}
                  postUserId={status.postUserId}
                  editStatus={() => editStatusHandle(status)}
                  deleteStatus={() => handleDelete(status.id)}
                  showInHome={true}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostStatus;
