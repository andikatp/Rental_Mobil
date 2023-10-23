import React, { useContext, useState } from "react";
import "./style.css";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPart = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      if(res.data.isAdmin){
        navigate('/rental')
      } else {
      dispatch({ type: "LOGIN_FAILURE", payload: {message: "Siapa Kamu"}});
      }
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE", payload: e.response.data });
    }
  };

  return (
    <>
    <div className="login">
      <div className="container-login">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="login-input"
        />
        <button disabled={loading} onClick={handleClick} className="login-button">
          Login
        </button>
        {error && <span>{error.message}</span>}
        {loading || error ? null : (
          <p>
            Belum punya akun?{" "}
            <a href="/register">Daftar Sekarang</a>
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default LoginPart;
