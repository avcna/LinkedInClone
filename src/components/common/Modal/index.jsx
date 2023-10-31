import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
}) => {
  return (
    <Modal
      title="Create a post"
      style={{ bottom: "30%" }}
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          onClick={sendStatus}
          type="primary"
          key="submit"
          disabled={status.length > 0 ? false : true}
        >
          Post
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
