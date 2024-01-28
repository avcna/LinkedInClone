import React from "react";
import "./index.scss";

const SearchResult = ({ name, headline, imageLink }) => {
  return (
    <div className="user-item">
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
