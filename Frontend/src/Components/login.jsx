import React from "react";
import Style from "../App.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className={Style.mainDivMainPage}>
        <div className={Style.loginPageMainDiv}>
          <div className={Style.loginPageDiv}>
            <div className={Style.loginPageDiv1}>
              <div className={Style.overlay1}>
              <p className={Style.loginPara1}>Welcome to login</p>
              <p className={Style.loginPara2}>Don't have an account?</p>
              <Link className={Style.createAccountBtn} to="/createAccount">Create Account</Link>
              </div>
            </div>
            <div className={Style.loginPageDiv2}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
