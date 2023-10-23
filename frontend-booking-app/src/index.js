import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SearchContextProvider from "./context/search-context";
import AuthContextProvider from "./context/auth-context";
import RegisterContextProvider from "./context/register-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterContextProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
);
