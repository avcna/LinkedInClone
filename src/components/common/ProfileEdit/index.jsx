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
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="common-input"
            type="text"
            placeholder="Name"
            onChange={getInput}
            name="name"
            defaultValue={currentUser.name}
          />
        </div>
        <div>
          <label htmlFor="headline">Headline</label>
          <input
            className="common-input"
            type="text"
            placeholder="Headline"
            onChange={getInput}
            name="headline"
            defaultValue={currentUser?.headline}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            className="common-input"
            type="text"
            placeholder="Location"
            onChange={getInput}
            name="location"
            defaultValue={currentUser?.location}
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            className="common-input"
            type="text"
            placeholder="Company"
            onChange={getInput}
            name="company"
            defaultValue={currentUser?.company}
          />
        </div>
        <div>
          <label htmlFor="industry">Industry</label>
          <input
            className="common-input"
            type="text"
            placeholder="Industry"
            onChange={getInput}
            name="industry"
            defaultValue={currentUser?.industry}
          />
        </div>
        <div>
          <label htmlFor="college">College</label>
          <input
            className="common-input"
            type="text"
            placeholder="College"
            onChange={getInput}
            name="college"
            defaultValue={currentUser?.college}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            className="common-input"
            type="text"
            placeholder="Website"
            onChange={getInput}
            name="website"
            defaultValue={currentUser?.website}
          />
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
            className="common-input textarea"
            type="text"
            placeholder="About"
            onChange={getInput}
            name="about"
            defaultValue={currentUser?.about}
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <input
            className="common-input"
            type="text"
            placeholder="Skills"
            onChange={getInput}
            name="skills"
            defaultValue={currentUser?.skills}
          />
        </div>
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
