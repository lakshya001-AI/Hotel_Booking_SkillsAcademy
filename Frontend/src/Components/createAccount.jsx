import React, { useState } from "react";
import Style from "../App.module.css";
import { Link } from "react-router-dom";

function CreateAccount() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function getData() {
    let obj = {
      email: email,
      password: password,
    };

    console.log(obj);
  }
  return (
    <>
      <div className={Style.mainDivMainPage}>
        <div className={Style.loginPageMainDiv}>
          <div className={Style.loginPageDiv}>
            <div className={Style.loginPageDiv1}>
              <div className={Style.overlay1}>
                <p className={Style.loginPara1}>Create Your Account</p>
                <p className={Style.loginPara2}>Already have an account?</p>
                <Link className={Style.backToSignINBtn} to="/">
                  sign In
                </Link>
              </div>
            </div>
            <div className={Style.loginPageDiv2}>
              {/* <p className={Style.signInPara}>Create Account</p> */}
              <div className={Style.emailInputDivCreateAccount}>
                <p>Name</p>
                <input
                  type="text"
                  className={Style.emailInputField}
                  placeholder="HBooking"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={Style.passwordInputDiv}>
                <p>Email</p>
                <input
                  type="email"
                  className={Style.emailInputField}
                  placeholder="HBooking@gmail.com"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={Style.passwordInputDiv}>
                <p>Password</p>
                <input
                  type="password"
                  className={Style.emailInputField}
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={Style.signInBtnInputDiv}>
                <button className={Style.createAccountBtn1} onClick={getData}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
