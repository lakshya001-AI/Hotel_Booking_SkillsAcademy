import React, { useEffect, useState } from "react";
import Style from "../App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const [destination, setDestination] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guest, setGuest] = useState();
  const [hotelData , setHotelData] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if(storedUser){
      setEmail(storedUser.email);
    }
  },[]);

  let getBookingDetails = async () => {
    if (!destination || !checkIn || !checkOut || !guest) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      return; // Exit the function early if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/getHotelDetails",
        {
          destination: destination,
          checkIn: checkIn,
          checkOut: checkOut,
          guest: guest,
        }
      );
      toast.success("Got the data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      // Do something with the response data if needed
      setHotelData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No Hotels found for the given destination", {
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
        toast.error("An error occurred. Please try again later.", {
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
      console.error(error); // Log the error for debugging purposes
    }
  };

  let bookHotel = async (hotelName, hotelAddress, hotelPrice) =>{
    await axios.post("http://localhost:5000/insertHotel",{hotelName,hotelAddress,hotelPrice,email})
    .then((res)=>{
      if(res.status === 201){
        toast.error("Hotel Already booked! check your Profile", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

      } else{
        toast.success("Hotel booked! check your Profile", {
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

    }).catch((error)=>{

      if(error.response && error.response.status === 404){
        toast.error("User not Found", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }else{
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
      }

    });

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
            <Link className={Style.userProfileBtn} to="/mainPage">
              Home
            </Link>
            <Link className={Style.userProfileBtn} to="/ProfilePage">
              Profile
            </Link>
            <Link className={Style.logoutBtn} to="/">
              logout
            </Link>
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
              We bring together the peoples, brands and technology that enables
              the success of other - welcoming every guest , families,
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
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className={Style.checkInInputFieldDiv}>
                <p>Check-in</p>
                <input
                  type="date"
                  className={Style.checkInInputField}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </div>
              <div className={Style.checkInInputFieldDiv}>
                <p>Check-out</p>
                <input
                  type="date"
                  className={Style.checkInInputField}
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </div>
              <div className={Style.guestInputFieldDiv}>
                <p>Guests</p>
                <input
                  type="text"
                  placeholder="e.g. - 2 Adults"
                  value={guest}
                  className={Style.destinationInputField}
                  onChange={(e) => {
                    setGuest(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={Style.searchBtnDiv}>
              <button className={Style.searchBtn} onClick={getBookingDetails}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel List based on the user data selected */}

      <div className={Style.listOfHotelDivMain}>
      {
        hotelData.map((hotel) => (
          <div className={Style.hotelBookDiv} key={hotel._id}>
          <div className={Style.hotelImgDiv}>
            <img src={hotel.imgLink}/>
          </div>

          <div className={Style.hotelInfoDiv}>
            <p className={Style.hotelNamePara}>{hotel.hotelName}</p>
            <p className={Style.hotelAddressPara}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={Style.iconColor}/>{`${hotel.hotelAddress}`}
            </p>
            <p className={Style.hotelDescriptionPara}>{hotel.hotelDescription}</p>
            <div className={Style.priceDivMain}>
              <div className={Style.priceDiv}>
                <p className={Style.pricePara}>{`₹${hotel.hotelPrice}`}</p>
                <p className={Style.nightRoomPara}>1 Room per night</p>
              </div>
              <div className={Style.bookBtnDiv}>
                <button className={Style.bookBtn} onClick={()=> bookHotel(hotel.hotelName, hotel.hotelAddress , hotel.hotelPrice)}>book</button>
              </div>
            </div>
          </div>
        </div>

        ))
      }
      </div>
      <ToastContainer />
    </>
  );
}
