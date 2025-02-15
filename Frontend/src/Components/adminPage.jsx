import React, { useState } from "react";
import Style from "../App.module.css";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import axios from "axios";


function AdminPage() {
  const [imgLink , setImgLink] = useState();
  const [hotelName, setHotelName] = useState();
  const [hotelCity,setHotelCity] = useState();
  const [hotelState,setHotelState] = useState();
  const [hotelAddress,setHotelAddress] = useState();
  const [hotelPrice,setHotelPrice] = useState();
  const [hotelDescription,setHotelDescription] = useState();




  const handleSubmit = async () => {

    if(hotelName && hotelCity && hotelState && hotelAddress && hotelPrice && hotelDescription && imgLink){
      // From here we are going to send the data to the backend and then save the data in the Database
      await axios.post("http://localhost:5000/setHotelData",{hotelName,hotelCity,hotelState,hotelAddress,hotelPrice,hotelDescription,imgLink})
      .then((res)=>{
        toast.success("Hotel added to the database", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }).catch((error)=>{
        if(error.response && error.response.status === 401){
          toast.error("Hotel Already Registered", {
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
          toast.error("Error occurred will saving data", {
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

      toast.error("All fields are necessary", {
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

  };

  return (
    <>
      <div className={Style.mainDivMainPage}>
        <div className={Style.adminMainDiv}>
          <div className={Style.adminNavbar}>
            <h3 className={Style.adminPara1}>Hotel Admin</h3>

            <div className={Style.adminNavButtonDiv}>
              <Link className={Style.addHotelBtn} to="/adminPage">
                Add Hotel
              </Link>
              <Link className={Style.usersBtn} to="/adminUsersPage">
                Users
              </Link>
              <Link className={Style.usersBtn} to="/">logout</Link>
            </div>
          </div>

          <div>
            <h4 className={Style.hotelDetailsHeading}>Hotel Details</h4>
          </div>

          <div className={Style.hotelAddFormDiv}>
            <div className={Style.hotelInfoDiv1}>
              <input
                type="text"
                className={Style.hotelName}
                placeholder="Hotel Name"
                value={hotelName}
                onChange={(e)=>setHotelName(e.target.value)}
              />
              <input
                type="text"
                className={Style.hotelCity}
                placeholder="City"
                value={hotelCity}
                onChange={(e)=>setHotelCity(e.target.value)}
              />
              <input
                type="text"
                className={Style.hotelState}
                placeholder="State"
                value={hotelState}
                onChange={(e)=>setHotelState(e.target.value)}
              />
            </div>

            <div className={Style.hotelInfoDiv2}>
              <input
                type="text"
                className={Style.hotelAddress}
                placeholder="Address"
                value={hotelAddress}
                onChange={(e)=>setHotelAddress(e.target.value)}
              />
              <input
                type="number"
                className={Style.hotelRoomPrice}
                placeholder="Price(Room)"
                value={hotelPrice}
                onChange={(e)=>setHotelPrice(e.target.value)}
              />
            </div>

            <div className={Style.hotelInfoDiv2}>
              <textarea
                name=""
                className={Style.hotelDescription}
                placeholder="Hotel Description"
                value={hotelDescription}
                onChange={(e)=>setHotelDescription(e.target.value)}
              ></textarea>

              <div className={Style.hotelImageDiv}>
                {/* <PhotoUpload/> */}
                <h2 className={Style.uploadFileHeading}>Upload a Photo</h2>
                <div className={Style.imageForm}>
                  <p className={Style.copyPara1}>Copy the image address and paste the address below.</p>
                  <p className={Style.notePara1}>*Note : The image should be there on the browser.</p>
                  <input type="text" className={Style.hotelImgLinkInput} value={imgLink} onChange={(e)=>setImgLink(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className={Style.hotelInfoDiv2}>
              {/* Here we have called the function to send the image to the backend  */}
              <button className={Style.hotelInfoSubmitBtn} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default AdminPage;
