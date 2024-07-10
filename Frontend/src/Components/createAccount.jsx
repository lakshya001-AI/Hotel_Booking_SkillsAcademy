import React, { useState } from "react";
import Style from "../App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link , Navigate} from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = Navigate();

  async function getData() {
    if (name && email && password) {
      await axios.post("http://localhost:5000/createUser",{name:name,email:email,password:password})
      .then((res)=>{
        toast.success("Account Created Successfully! Please login with email and password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      }).catch((error)=>{
        if (error.response && error.response.status === 409) {
          toast.error("User already exists", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Error in saving the Data", {
            position: "top-center",
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
    }else{
      toast.warn("All fields are required", {
        position: "top-center",
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.passwordInputDiv}>
                <p>Email</p>
                <input
                  type="email"
                  className={Style.emailInputField}
                  placeholder="HBooking@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
      <ToastContainer />
    </>
  );
}

export default CreateAccount;
