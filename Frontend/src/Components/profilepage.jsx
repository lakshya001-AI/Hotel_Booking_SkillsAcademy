import React, { useState, useEffect } from "react";
import Style from "../App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedHotels, setBookedHotels] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
      setUserName(storedUser.name);
      setEmail(storedUser.email);
    }

  },[]);

  useEffect(() => {
    axios.post("http://localhost:5000/getUserHotels", { email })
      .then((res) => setBookedHotels(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login"); // Redirect to login page after logout
  };

  const removeHotel = (indexToRemove) => {
    const updatedHotel = bookedHotels.filter((_, index) => index !== indexToRemove);
    setBookedHotels(updatedHotel);
  
    axios.post("http://localhost:5000/removeItemFromData", {
      email: email,
      index: indexToRemove
    })
    .then((res) => {
      console.log("Response received: ", res); // Add this line
      if (res.status === 200) {
        toast.success("Booking Cancelled", {
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
    })
    .catch((error) => {
      console.error("Error: ", error); // Add this line
      toast.error("An internal error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    });
  };
  

  console.log(username);
  console.log(email);

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
            <Link className={Style.userProfileBtn} to="/mainPage">
              Home
            </Link>
            <Link className={Style.userProfileBtn} to="/ProfilePage">
              Profile
            </Link>
            <Link className={Style.logoutBtn} to="/" onClick={handleLogout}>
              logout
            </Link>
          </div>
        </div>

        <div className={Style.profileInfoDiv}>
          <p className={Style.usernamePara}>{`Hello ${username},`}</p>
          <p className={Style.userEmailPara}>{`Email : ${email}`}</p>
        </div>

        <div className={Style.hotelListDiv}>
          {bookedHotels.length > 0 ? (
            bookedHotels.map((hotel, index) => (
              <div className={Style.selectedHotelDiv} key={index}>
                <p className={Style.hotelNamePara}>{hotel.hotelName}</p>
                <p className={Style.hotelAddressPara}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className={Style.iconColor}
                  />
                  {hotel.hotelAddress}
                </p>

                <div className={Style.priceAndCancelDiv}>
                  <p className={Style.pricePara}>{`₹${hotel.hotelPrice}`}</p>
                  <button className={Style.bookBtn} onClick={()=>removeHotel(index)}>Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <div className={Style.noHotelBooked}>
              <p>No hotels booked yet</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default ProfilePage;
