import React, { useEffect, useState } from "react";
import "./index.scss";
import { MdOutlineCancel } from "react-icons/md";
import { getAllUsers } from "../../../api/fireStoreAPIs";

const SearchUsers = ({ onCancel, onChange }) => {
  return (
    <div className="wrapper-search">
      <input type="text" className="input-search" onChange={onChange} />
      <MdOutlineCancel className="cancel-btn" onClick={onCancel} />
    </div>
  );
};

export default SearchUsers;
