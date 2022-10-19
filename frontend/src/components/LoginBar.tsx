import React from "react";
import "../App.css";
import { useState } from "react";
import { loginModel, registrationModel } from "../models/API_calls";

const LoginBar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //user feedback className modifiers
  const [isUsernameValid, setIsUsernameValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [warning, setWarning] = useState(false);

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
    const loginResponse = await loginModel(username, password);
    console.log(loginResponse.login_response);

    //adjust CSS to highlight incorrect inputs
    if (username === "") {
      setIsUsernameValid("");
    } else if (loginResponse.login_response.outcome === "user not found") {
      setIsUsernameValid("invalid");
    } else {
      setIsUsernameValid("valid");
    }
    if (password === "") {
      setIsPasswordValid("");
    } else if (loginResponse.login_response.outcome === "invalid password") {
      setIsPasswordValid("invalid");
    } else {
      setIsPasswordValid("valid");
    }
    //take obj and insert into theme provider
  };

  const handleRegistation = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (/\s/.test(username) || /\s/.test(username) || username.length === 0 || password.length === 0) {
      console.log("Username or password cannot contain whitespace");
      setIsUsernameValid("invalid");
      setIsPasswordValid("invalid");
      setWarning(true);
      return (<p>Username or password cannot be empty or contain whitespace.</p>)
    } else {
      setWarning(false);
    }
    const registrationResponse = await registrationModel(username, password);
    console.log(registrationResponse);

    //adjust CSS to highlight incorrect inputs
    if (username === "") {
      setIsUsernameValid("");
    } else if (
      registrationResponse.msg === "400-duplicate username" ||
      registrationResponse.msg === "400-missing requirement"
    ) {
      setIsUsernameValid("invalid");
    } else {
      setIsUsernameValid("valid");
    }
    if (password === "") {
      setIsPasswordValid("");
    } else if (registrationResponse.msg === "400-missing requirement") {
      setIsPasswordValid("invalid");
    } else {
      setIsPasswordValid("valid");
    }

    //take obj and insert into theme provider
    // flash up registration successful
  };

  return (
    <>
    <header className="header_auth">
      <form className="header_form">
        <label className="login_item" htmlFor="username">
          Username:{" "}
        </label>
        <input
          className={
            "login_item " +
            (isUsernameValid === ""
              ? ""
              : isUsernameValid === "valid"
              ? "login_item_valid"
              : "login_item_invalid")
          }
          id="usernameInput"
          type="text"
          onChange={changeUsername}
        ></input>
        <label className="login_item" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className={
            "login_item " +
            (isUsernameValid === ""
              ? ""
              : isPasswordValid === "valid"
              ? "login_item_valid"
              : "login_item_invalid")
          }
          id="passwordInput"
          type="text"
          onChange={changePassword}
        ></input>
        <button className="login_item login_button" onClick={handleLogin}>
          Login
        </button>
        <button className="login_item login_button" onClick={handleRegistation}>
          Register
        </button>
      </form>
    </header>

    <div className={warning ? "visible": "not_visible"}>
     <p> Username or password cannot be empty or contain whitespace. </p>
    </div>
    </>
  );
};

export default LoginBar;
