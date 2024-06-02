import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import UserContext from "../../Context/UserContext";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      <FaSignOutAlt /> Logout
    </button>
  );
};

export default Logout;
