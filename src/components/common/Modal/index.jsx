import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  setIsEdit,
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
      }}
      footer={[
        <Button
          onClick={() => {
            sendStatus();
            setIsEdit(false);
          }}
          type="primary"
          key="submit"
          disabled={status.length > 0 ? false : true}
        >
          {isEdit ? "Edit" : "Post"}
        </Button>,
      ]}
    >
      <input
        className="modal-input"
        type="text"
        name="input-status"
        placeholder="What do you want to talk about?"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
    </Modal>
  );
};

export default ModalComponent;
