import React, { useState } from "react";
import Style from "../App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
``
function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  async function loginUser() {
    if (email && password) {
      await axios.post("http://localhost:5000/loginUser",{email:email,password:password})
      .then((res)=>{

        if(res.status === 201){

          toast.success("Admin login Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        
          

          setTimeout(()=>{
            navigate("/adminPage");
          },5000);


        }else{
         toast.success("login Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }); 

          setTimeout(()=>{
            navigate("/mainPage");
          },5000);

        }
      }).catch((error)=>{
        if(error.response && error.response.status === 401){
          toast.error("Account doesn't exits! Please create the account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });

        }
        if(error.response && error.response.status === 400){
          toast.error("Please Check Your Email and Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }

      });
    }else {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
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
                <Link className={Style.createAccountBtn} to="/createAccount">
                  Create Account
                </Link>
              </div>
            </div>
            <div className={Style.loginPageDiv2}>
              <div className={Style.emailInputDiv}>
                <p>Email</p>
                <input
                  type="email"
                  className={Style.emailInputField}
                  placeholder="hbooking@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={Style.passwordInputDiv}>
                <p>Password</p>
                <input
                  type="password"
                  className={Style.emailInputField}
                  placeholder="*************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={Style.signInBtnInputDiv}>
                <button className={Style.signInBtn} onClick={loginUser}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
