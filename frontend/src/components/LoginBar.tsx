import React from "react";
import "../App.css";
import { useState } from "react";
import { loginModel } from "../models/API_calls";

const LoginBar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setUsername(target.value);
  };
  const changePassword = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setPassword(target.value);
  };

  const handleLogin = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("clicked login");
     await loginModel(username, password);

  };

  return (
    <header className="header_auth">
      <form className="header_form">
        <label className="login_item" htmlFor="username">
          Username:{" "}
        </label>
        <input
          className="login_item"
          id="usernameInput"
          type="text"
          onChange={changeUsername}
        ></input>
        <label className="login_item" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className="login_item"
          id="passwordInput"
          type="text"
          onChange={changePassword}
        ></input>
        <button className="login_item login_button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </header>
  );
};

export default LoginBar;
