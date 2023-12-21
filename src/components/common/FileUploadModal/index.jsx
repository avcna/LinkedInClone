import React, { useState } from "react";
import "./index.scss";
import { Button, Modal } from "antd";
import { ImageUpload } from "../../../api/ImageUpload.jsx";

const FileUploadModal = ({ stateOpen, setStateOpen, currentUser }) => {
  const [currentImage, setCurrentImage] = useState({});
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const uploadPict = () => {
    ImageUpload(currentImage, currentUser?.UserId);
  };
  return (
    <>
      <Modal
        title="Add Profile Image"
        style={{
          top: 50,
        }}
        open={stateOpen}
        onCancel={() => setStateOpen(false)}
        footer={[
          <Button
            onClick={() => {
              try {
                uploadPict();
                setStateOpen(false);
              } catch (error) {}
            }}
            disabled={currentImage.name ? false : true}
          >
            Add Profile Picture
          </Button>,
        ]}
      >
        <div className="input-wrapper">
          <label for="image-upload" className="input-image">
            Add Image
          </label>
          <p>{currentImage.name}</p>
          <input
            hidden
            id="image-upload"
            type="file"
            onChange={(e) => getImage(e)}
          />
        </div>
      </Modal>
    </>
  );
};

export default FileUploadModal;
