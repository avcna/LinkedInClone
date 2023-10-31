import React from "react";
import "./index.scss";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";

export const ProfilePopup = () => {
  let navigate = useNavigate();
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li className="popup-option" onClick={() => navigate("profile")}>
          View Profile
        </li>
        <li className="popup-option" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};
