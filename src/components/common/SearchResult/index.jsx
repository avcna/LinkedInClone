import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ name, headline, imageLink, email }) => {
  const navigate = useNavigate();
  return (
    <div
      className="user-item"
      onClick={() => navigate("/profile", { state: { email: email } })}
    >
      <div className="img-wrapper">
        <img className="profile-image" src={imageLink} alt="img" />
      </div>
      <div className="info-wrapper">
        <div>
          <p className="name">{name}</p>
          <p>headline</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
