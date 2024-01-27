import React, { useEffect, useState } from "react";
import "./index.scss";
import { MdOutlineCancel } from "react-icons/md";
import { getAllUsers } from "../../../api/fireStoreAPIs";

const SearchUsers = ({ onCancel }) => {
  //   const [user, setUser] = useState([]);
  //   useEffect(() => {
  //     getAllUsers(setUser);
  //   }, []);

  return (
    <div className="wrapper-search">
      <input type="text" className="input-search" />
      <MdOutlineCancel className="cancel-btn" onClick={onCancel} />
    </div>
  );
};

export default SearchUsers;
