import React, { useState } from "react";
import { Button, Modal } from "antd";
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
  uploadPostImg,
}) => {
  return (
    <Modal
      title={isEdit ? "Edit Post" : "Create a post"}
      style={{ bottom: "30%" }}
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
        setStatus("");
        setIsEdit(false);
        setPostImg("");
      }}
      footer={[
        <Button
          onClick={() => {
            sendStatus();
            setIsEdit(false);
            setPostImg("");
          }}
          type="primary"
          key="submit"
          disabled={status.length > 0 ? false : true}
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
      <label htmlFor="upload-img">
        <AiOutlinePicture size={30} />
      </label>
      <input
        id="upload-img"
        type="file"
        accept="image"
        hidden
        onChange={(event) => uploadPostImg(event.target.files[0], setPostImg)}
      />
      {postImg.length > 0 && (
        <img width={"100%"} src={postImg} alt="image selected" />
      )}
    </Modal>
  );
};

export default ModalComponent;
