import React from 'react'
import Style from "../App.module.css"
import { Link } from 'react-router-dom';

function AdminUsersPage() {
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

    </div>

  </div>


  
  </>
}

export default AdminUsersPage;