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
        <div className={Style.bookingInfoDivMain}>
          <div className={Style.bookingInfoDiv}>
            <div className={Style.overlay}>
              <p className={Style.bookingParaIntro}>
                Your Perfect Stay at the Best Price
              </p>
              <p className={Style.bookingParaIntro1}>
                We bring together the peoples, brands and technology that
                enables the success of other - welcoming every guest , families,
                everywhere there journey takes them !!
              </p>
              <div className={Style.bookingInfoInputDiv}>
                <div className={Style.destinationInputFieldDiv}>
                  <p>Destination</p>
                  <input
                    type="text"
                    placeholder="e.g. - City, landmark, Area"
                    className={Style.destinationInputField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel List based on the user data selected */}
      </div>
    </>
  );
}
