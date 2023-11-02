import React, { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/fireStoreAPIs";

const ProfileEdit = ({ onEdit, currentUser }) => {
  const [editInput, setEditInput] = useState({});
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInput({ ...editInput, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.UserId, editInput);
    await onEdit();
  };

  console.log(editInput);
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Go Back</button>
      </div>
      <div className="profile-edit-inputs">
        <input
          className="common-input"
          type="text"
          placeholder="Name"
          onChange={getInput}
          name="name"
          defaultValue={currentUser.name}
        />
        <input
          className="common-input"
          type="text"
          placeholder="Headline"
          onChange={getInput}
          name="headline"
          defaultValue={currentUser?.headline}
        />
        <input
          className="common-input"
          type="text"
          placeholder="Location"
          onChange={getInput}
          name="location"
          defaultValue={currentUser?.location}
        />
        <input
          className="common-input"
          type="text"
          placeholder="Company"
          onChange={getInput}
          name="company"
          defaultValue={currentUser?.company}
        />
        <input
          className="common-input"
          type="text"
          placeholder="College"
          onChange={getInput}
          name="college"
          defaultValue={currentUser?.college}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
