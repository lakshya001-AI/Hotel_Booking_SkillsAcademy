import React from "react";
import Style from "../App.module.css";

export default function MainPage() {
  return (
    <>
      <div className={Style.mainDivMainPage}>
        {/* Navbar section that will contain the login and create account and the user Profile (if the user successful login )*/}
        <div className={Style.navBar}>
          <div className={Style.navBarHeading}>
            <img
              src="/Assets/HBooking.png"
              alt="Hotel Booking Logo"
              className={Style.logoImage}
            />
            <p className={Style.headingPara}>HBooking</p>
          </div>
          <div className={Style.loginAndCreateAccountDiv}>
            <button className={Style.loginBtn}>login</button>
            <button className={Style.createAccountBtn}>Create Account</button>
          </div>
        </div>
        {/* Booking Data section and Search Button to search for the Hotels */}
        

        {/* Hotel List based on the user data selected */}
      </div>
    </>
  );
}
