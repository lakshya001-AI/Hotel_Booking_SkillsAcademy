import React, { useEffect, useState } from 'react'
import Style from "../App.module.css"
import { Link } from 'react-router-dom';
import axios from "axios";

function AdminUsersPage() {

  // We are going to fetch the users from the users database and show the users here

  const [users, setUsers] = useState([]);

  
  useEffect(()=>{
    async function getData(){
      axios.get("http://localhost:5000/getUsersDetails")
      .then((res)=>{
        if(res.status === 200){
          setUsers(res.data);
        }
      })
      .catch((error)=>{
        toast.error("Error in getting the users data", {
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
    }
    getData();
  },[]);

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

      <div className={Style.usersList}>
      {
        users.map((user) => (
          <div key={user._id} className={Style.usersDiv1}>
            <p>{user.name}</p>
          </div>
        ))
      }
    </div>

  </div>
  </div>


  
  </>
}

export default AdminUsersPage;