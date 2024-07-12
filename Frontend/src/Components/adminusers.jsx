import React, { useEffect, useState } from 'react'
import Style from "../App.module.css"
import { Link } from 'react-router-dom';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify"

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


  async function deleteUser(userName){
    try {
      await axios.post("http://localhost:5000/deleteUser", {userName})
      .then((res)=>{
        if(res.status === 200){
          toast.success("User has been deleted", {
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

        setUsers(users.filter(user => user.name !== userName));

      }).catch((error)=>{
        toast.success("Error deleting the user", {
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
      
    } catch (error) {
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
  }

  return <>

  <div className={Style.mainDivMainPage}>
    <div className={Style.adminMainDiv}>
      <div className={Style.adminNavbar}>
      <h3 className={Style.adminPara1}>Admin Panel</h3>

      <div className={Style.adminNavButtonDiv}>
      <Link className={Style.addHotelBtn} to="/adminPage">Add Hotel</Link>
      <Link className={Style.usersBtn} to="/adminUsersPage">Users</Link>
      <Link className={Style.usersBtn} to="/">logout</Link>
      </div>


      </div>

      <div className={Style.usersList}>
      {
        users.map((user) => (
          <div key={user._id} className={Style.usersDiv1}>
            <p className={Style.userNameAdminPage}>{user.name}</p>
            <p className={Style.userEmailAdminPage}>{user.email}</p>
            <button className={Style.deleteUserBtn} onClick={()=> deleteUser(user.name)}>Delete</button>
          </div>
        ))
      }
    </div>

  </div>
  </div>
  <ToastContainer/>


  
  </>
}

export default AdminUsersPage;