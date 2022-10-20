import React from "react";
import "../App.css";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { loginModel, registrationModel } from "../models/API_calls";

const LoginBar = () => {
  //grab context
  const context = useContext(UserContext);
  const user = context.user;
  const setUser = context.setUser;

  //assign component's states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //user feedback className modifiers
  const [isUsernameValid, setIsUsernameValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [warning, setWarning] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  //change input field states
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

    //on successful login set Context.user = username
    if (loginResponse.login_response.outcome === "valid") {
      setUser(loginResponse.login_response.username);
    }
  };

  const handleRegistation = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    //prevent submission of empty strings to registration
    if (
      /\s/.test(username) ||
      /\s/.test(password) ||
      username.length === 0 ||
      password.length === 0
    ) {
      setIsUsernameValid("invalid");
      setIsPasswordValid("invalid");
      setWarning(true);
      return <p>Username or password cannot be empty or contain whitespace.</p>;
    } else {
      setWarning(false);
    }
    const registrationResponse = await registrationModel(username, password);

    //adjust CSS to highlight incorrect inputs
    if (username === "") {
      setIsUsernameValid("");
    } else if (
      registrationResponse.msg === "400-duplicate username" ||
      registrationResponse.msg === "400-missing requirement"
    ) {
      setIsUsernameValid("invalid");
      setRegistrationSuccessful(false);
    } else {
      setIsUsernameValid("valid");
    }
    if (password === "") {
      setIsPasswordValid("");
    } else if (registrationResponse.msg === "400-missing requirement") {
      setIsPasswordValid("invalid");
      setRegistrationSuccessful(false);
    } else {
      setIsPasswordValid("valid");
    }

    //may need to go back to server and align err and successful response objects
    try {
      if (
        registrationResponse.registration_response.msg ===
        "Registation successful."
      ) {
        setRegistrationSuccessful(true);
        setUser(registrationResponse.registration_response.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="header_auth">
        <form className="header_form">
          <p className="current_user">{user}</p>
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
            type="password"
            onChange={changePassword}
          ></input>
          <button className="login_item login_button" onClick={handleLogin}>
            Login
          </button>
          <button
            className="login_item login_button"
            onClick={handleRegistation}
          >
            Register
          </button>
        </form>
      </header>

      <div className="alert">
        <p className={warning ? "visible" : "not_visible"}>
          Username or password cannot be empty or contain whitespace.
        </p>
        <p className={registrationSuccessful ? "visible" : "not_visible"}>
          User registration successful.
        </p>
        <p
          className={
            isUsernameValid !== "valid" && isUsernameValid !== ""
              ? "visible"
              : "not_visible"
          }
        >
          Please select another username.
        </p>
        <p
          className={
            isPasswordValid !== "valid" && isPasswordValid !== ""
              ? "visible"
              : "not_visible"
          }
        >
          Password is incorrect. Please input another password.
        </p>
      </div>
    </>
  );
};

export default LoginBar;
