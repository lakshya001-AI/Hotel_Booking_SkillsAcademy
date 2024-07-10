import React from 'react'
import Style from "../App.module.css"

function AdminPage() {
  return <>

  <div className={Style.mainDivMainPage}>
    <div className={Style.adminMainDiv}>
      <div className={Style.adminNavbar}>
      <h3 className={Style.adminPara1}>Admin Panel</h3>

      <div className={Style.adminNavButtonDiv}>
        <button className={Style.addHotelBtn}>Add Hotel</button>
        <button className={Style.usersBtn}>Users</button>
      </div>


      </div>

    </div>

  </div>


  
  </>
}

export default AdminPage;