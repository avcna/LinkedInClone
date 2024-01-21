import React, { useState, useMemo } from "react";
import {
  getPostStatusByEmail,
  deleteStatus,
  editStatus,
} from "../../../api/fireStoreAPIs";
import "./index.scss";
import PostCard from "../PostCard.jsx";
import { useLocation } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import FileUploadModal from "../FileUploadModal/index.jsx";
import ModalComponent from "../Modal/index.jsx";

const ProfileCard = ({ currentUser, onEdit }) => {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [isEditPhoto, setEditPhoto] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const handleDelete = (id) => {
    deleteStatus(id);
  };

  const sendStatus = async () => {
    await editStatus(currentPost.id, status);
    await setModalOpen(false);
    await setStatus("");
  };

  const editStatusHandle = (post) => {
    setStatus(post.status);
    setModalOpen(true);
    setIsEdit(true);
    setCurrentPost(post);
  };

  useMemo(() => {
    if (location?.state?.email) {
      getPostStatusByEmail(setAllStatus, location.state.email);
    } else {
      getPostStatusByEmail(setAllStatus, localStorage.getItem("userEmail"));
    }
  }, []);

  return (
    <>
      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        setStatus={setStatus}
        sendStatus={sendStatus}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <div className="profile-card">
        <div
          onClick={onEdit}
          className={`${
            currentUser.email !== localStorage.getItem("userEmail") &&
            "visibility"
          } edit-btn`}
        >
          <BiPencil />
        </div>
        <div className="profile-info">
          <div>
            <div className="wrapper-profile-image">
              <img
                src={currentUser?.imageLink}
                alt=""
                className="profile-image"
                onClick={() => setEditPhoto(!isEditPhoto)}
              />
            </div>
            {isEditPhoto && (
              <FileUploadModal
                stateOpen={isEditPhoto}
                setStateOpen={setEditPhoto}
                currentUser={currentUser}
              />
            )}

            <h3 className="username">{currentUser.name}</h3>
            <p className="headline">{currentUser?.headline}</p>
            <p className="location">{currentUser?.location}</p>
            <a className="website" href={currentUser?.website} target="_blank">
              {currentUser?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="">{currentUser?.college}</p>
            <p className="">{currentUser?.company}</p>
          </div>
        </div>
      </div>
      {(currentUser?.about || currentUser?.skills) && (
        <div className="profile-card">
          {currentUser?.about && (
            <>
              <h3 className="about">About</h3>
              <p className="p-about">{currentUser?.about}</p>
            </>
          )}
          {currentUser?.skills && (
            <>
              <h3 className="about">Skills</h3>
              <p className="p-about">{currentUser?.skills}</p>
            </>
          )}
        </div>
      )}

      <div className="post-status-main">
        <div>
          {allStatus.map((status, i) => {
            return (
              <PostCard
                currentUser={status.currentUser}
                key={i}
                status={status.status}
                timeStamp={status.timeStamp}
                id={status.postId}
                userEmail={status.userEmail}
                postUserId={status.postUserId}
                editStatus={() => editStatusHandle(status)}
                deleteStatus={() => handleDelete(status.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
