import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../../api/fireStoreAPIs";

export const ProfilePopup = () => {
  let navigate = useNavigate();
  const [bio, setBio] = useState({ name: "awal", headline: "awal" });
  useEffect(
    () => getUserByEmail(setBio, localStorage.getItem("userEmail")),
    []
  );

  return (
    <div className="popup-card">
      <div>
        <h4>{bio[0]?.name}</h4>
        <p>{bio[0]?.headline}</p>
      </div>

      <button
        className="popup-option"
        onClick={() =>
          navigate("/profile", {
            state: { email: localStorage.getItem("userEmail") },
          })
        }
      >
        View Profile
      </button>
      <button className="popup-option" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};
