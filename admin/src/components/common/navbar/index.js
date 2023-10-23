import React from "react";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NavbarPart = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      await axios.get("/auth/logout");
      Swal.fire({
        icon: "success",
        title: "Youve been logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('login');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: error.stack,
      });
    }
  }

  return (
    <nav>
      <div className="container-nav">
        <div class="left-nav">
          <a href="/">
            <h1>GoRentAdmin</h1>
          </a>
        </div>
        <div class="middle-nav">
          <ul>
            <li>
              <a href="/rental">
                Rental
              </a>
            </li>
            <li>
              <a href="/mobil">Mobil</a>
            </li>
          </ul>
        </div>
        <div class="right-nav">
          <button onClick={()=> {handleLogout()}}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPart;
