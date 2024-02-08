import React, { useState } from "react";
import { Button, Modal, Progress, Space } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  setIsEdit,
  setPostImg,
  postImg,
  setFilename,
  filename,
  uploadPostImg,
  deleteImg,
}) => {
  const [progress, setProgress] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);
  return (
    <Modal
      title={isEdit ? "Edit Post" : "Create a post"}
      style={{ top: "5%", maxHeight: "calc(100vh - 200px)" }}
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
        setStatus("");
        setIsEdit(false);
        setPostImg({});
        setProgress(0);
        setShowSkeleton(false);
      }}
      footer={[
        <Button
          onClick={() => {
            sendStatus();
            setIsEdit(false);
            setPostImg({});
            setShowSkeleton(false);
          }}
          type="primary"
          key="submit"
          disabled={status.length > 0 || postImg.length > 0 ? false : true}
        >
          {isEdit ? "Edit" : "Post"}
        </Button>,
      ]}
    >
      <textarea
        className="modal-input"
        type="text"
        name="input-status"
        placeholder="What do you want to talk about?"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
      <label
        htmlFor="upload-img"
        onClick={() => {
          setPostImg("");
          setProgress(0);
          setShowSkeleton(true);
        }}
      >
        <AiOutlinePicture size={30} />
      </label>
      <input
        id="upload-img"
        type="file"
        accept="image"
        hidden
        onChange={(event) =>
          uploadPostImg(
            event.target.files[0],
            setPostImg,
            setProgress,
            setFilename
          )
        }
      />

      {Object.keys(postImg).length > 0 ? (
        <div className="img-wrapper">
          <div
            className="onclose-img"
            onClick={() => {
              deleteImg();
              setShowSkeleton(false);
            }}
          >
            X
          </div>
          <img width={"100%"} src={postImg} alt="image selected" />
          {filename && <p className="filename">{filename}</p>}
        </div>
      ) : (
        showSkeleton && (
          <div className="skeleton-wrapper">
            <Space wrap>
              <Progress type="circle" percent={progress} size={25} />
            </Space>
          </div>
        )
      )}
    </Modal>
  );
};

export default ModalComponent;
