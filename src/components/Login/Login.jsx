import React from "react";
import "./Login.css";
import logo from "./Assets/logo.png";
import { loginUrl } from "../spotify";

function Login() {
  return (
    <div className="Login">
      {/* <h1>Login Page</h1> */}
      <img src={logo} alt="" />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
