import React, { useState } from "react";
import "./index.scss";
import { Button, Modal } from "antd";

const FileUploadModal = ({ stateOpen, setStateOpen }) => {
  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        style={{
          top: 20,
        }}
        open={stateOpen}
        onOk={() => setStateOpen(false)}
        onCancel={() => setStateOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default FileUploadModal;
