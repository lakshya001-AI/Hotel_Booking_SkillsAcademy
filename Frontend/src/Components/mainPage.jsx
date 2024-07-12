import React, { useState } from "react";
import Style from "../App.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";




export default function MainPage() {

  const[destination, setDestination] = useState();
  const[checkIn, setCheckIn] = useState();
  const[checkOut, setCheckOut] = useState();
  const[guest, setGuest] = useState();
  const[showProfileDetails, setShowProfileDetails] = useState(false);

  function handleProfileClick(){
    setShowProfileDetails(!showProfileDetails);
}





  let getBookingDetails = () => {

    if (!destination || !checkIn || !checkOut || !guest) {
      toast.error('All fields are required', {
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
      let dataObj = {
        destination: destination,
        checkIn: checkIn,
        checkOut: checkOut,
        guest: guest
      };
      console.log(dataObj);
    }

  }

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
          <Link className={Style.userProfileBtn} to="/mainPage">Home</Link>
            <Link className={Style.userProfileBtn} to="/ProfilePage">Profile</Link>
            <Link className={Style.logoutBtn} to="/">logout</Link>
          </div>
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
                    value={destination}
                    onChange={(e)=>setDestination(e.target.value)}
                  />
                </div>
                <div className={Style.checkInInputFieldDiv}>
                  <p>Check-in</p>
                  <input
                    type="date"
                    className={Style.checkInInputField}
                    value={checkIn}
                    onChange={(e)=>{setCheckIn(e.target.value)}}
                  />
                </div>
                <div className={Style.checkInInputFieldDiv}>
                  <p>Check-out</p>
                  <input
                    type="date"
                    className={Style.checkInInputField}
                    value={checkOut}
                    onChange={(e)=>{setCheckOut(e.target.value)}}
                  />
                </div>
                <div className={Style.guestInputFieldDiv}>
                  <p>Guests</p>
                  <input
                    type="text"
                    placeholder="e.g. - 2 Adults"
                    value={guest}
                    className={Style.destinationInputField}
                    onChange={(e)=>{setGuest(e.target.value)}}
                    />
                </div>
              </div>
              <div className={Style.searchBtnDiv}>
              <button className={Style.searchBtn} onClick={getBookingDetails}>Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel List based on the user data selected */}
      <ToastContainer />

    </>
  );
}
