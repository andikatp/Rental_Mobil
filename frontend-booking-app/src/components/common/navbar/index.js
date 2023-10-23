import React, { useContext } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

const NavBarPart = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const { user, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  }

  return (
    <>
      <nav className="container-navbar">
        <div className="navbar-item">
          <h1 onClick={() => handleHome()}>GoRent</h1>
        </div>
        <div className="navbar-item">
          {!user ? (
            <>
              <button className="navbar-button" onClick={handleRegister}>Daftar</button>
              <button className="navbar-button" onClick={handleLogin}>Masuk</button>
            </>
          ) : (
            <button className="navbar-button" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBarPart;
