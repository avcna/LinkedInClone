import { useEffect, useState, useMemo } from "react";
import React from "react";
import "./index.scss";
import ModalComponent from "../Modal";
import { PostStatusAPI, getPostStatus } from "../../../api/fireStoreAPIs";
import PostCard from "../PostCard.jsx";
import { getCurrentUser } from "../../../api/fireStoreAPIs";

const PostStatus = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);

  const sendStatus = async () => {
    await PostStatusAPI(status, currentUser);
    await setModalOpen(false);
    await setStatus("");
  };
  useMemo(() => {
    getPostStatus(setAllStatus);
  }, []);
  return (
    <div className="base">
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
        />
      </div>
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
  );
};

export default PostStatus;
