import React, { useState } from "react";
import Style from "../App.module.css";
import { Link } from "react-router-dom";

function LoginPage() {

  const[email, setEmail] = useState();
  const[password, setPassword] = useState();

  function getData(){
    let obj = {
      email:email,
      password:password
    }

    console.log(obj);
  }
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
            <div className={Style.loginPageDiv2}>
              <div className={Style.emailInputDiv}>
                <p>Email</p>
                <input type="email" className={Style.emailInputField} placeholder="hbooking@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className={Style.passwordInputDiv}>
                <p>Password</p>
                <input type="password" className={Style.emailInputField} placeholder="*************" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className={Style.signInBtnInputDiv}>
              <button className={Style.signInBtn} onClick={getData}>Sign In</button>
              </div>

             

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
