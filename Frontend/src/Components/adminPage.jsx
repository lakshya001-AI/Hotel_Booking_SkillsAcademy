import React from 'react'
import Style from "../App.module.css"
import { Link } from 'react-router-dom';

function AdminPage() {
  return <>

  <div className={Style.mainDivMainPage}>
    <div className={Style.adminMainDiv}>
      <div className={Style.adminNavbar}>
      <h3 className={Style.adminPara1}>Admin Panel</h3>

      <div className={Style.adminNavButtonDiv}>
        <Link className={Style.addHotelBtn} to="/adminPage">Add Hotel</Link>
        <Link className={Style.usersBtn} to="/adminUsersPage">Users</Link>
      </div>

      </div>

      <div className={Style.hotelAddFormDiv}>

        <div className={Style.hotelInfoDiv1}>
          <input type="text" className={Style.hotelName} placeholder='Hotel Name'/>
          <input type="text" className={Style.hotelCity} placeholder='City'/>
          <input type="text" className={Style.hotelState} placeholder='State'/>

        </div>

        <div className={Style.hotelInfoDiv2}>
          <input type="text" className={Style.hotelAddress} placeholder='Address'/>
          <input type="text" className={Style.hotelRoomPrice} placeholder='Price'/>

        </div>

        <div className={Style.hotelInfoDiv2}>
          <textarea name="" ></textarea>

        </div>

        
      </div>

    </div>

  </div>


  
  </>
}

export default AdminPage;