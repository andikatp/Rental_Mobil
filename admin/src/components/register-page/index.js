import React, { useContext, useState } from "react";
import "./style.css";
import axios from "axios";
import Swal from 'sweetalert2';
import { RegisterContext } from "../../context/register-context";

const RegisterPart = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    kota: undefined,
    telephone: undefined,
  });

  const { loading, error, dispatch } = useContext(RegisterContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      Swal.fire({
        icon: 'success',
        title: 'Silahkan Login Sekarang',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (e) {
      dispatch({ type: "REGISTER_FAILURE", payload: e.response.data });
    }
  };

  return (
    <>
    <div className="register">

      <div className="container-register">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="text"
          placeholder="kota"
          id="kota"
          onChange={handleChange}
          className="register-input"
        />
          <input
          type="text"
          placeholder="telephone"
          id="telephone"
          onChange={handleChange}
          className="register-input"
        />
        <button disabled={loading} onClick={handleClick} className="register-button">
          Daftar
        </button>
        {error && <span>{error.message}</span>}
        {loading || error ? null : (
          <p>
            Sudah punya akun?{" "}
            <a href="/login">Login sekarang</a>
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default RegisterPart;
