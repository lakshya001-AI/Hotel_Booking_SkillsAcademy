// import React, { useState , useEffect} from "react";
// import Style from "../App.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// function ProfilePage() {

//     const[username, setUserName] = useState();
//     const[email, setEmail] = useState();
  
//     useEffect(()=>{
//       const storedUser = JSON.parse(localStorage.getItem('userData'));
//       setUserName(storedUser.name);
//       setEmail(storedUser.email);
//     },[]);

//   return (
//     <>
//       <div className={Style.mainDivMainPage}>
//         {/* Navbar section that will contain the login and create account and the user Profile (if the user successful login )*/}
//         <div className={Style.navBar}>
//           <div className={Style.navBarHeading}>
//             <img
//               src="/Assets/HBooking.png"
//               alt="Hotel Booking Logo"
//               className={Style.logoImage}
//             />
//             <p className={Style.headingPara}>HBooking</p>
//           </div>
//           <div className={Style.loginAndCreateAccountDiv}>
//             <Link className={Style.userProfileBtn} to="/ProfilePage">
//               Profile
//             </Link>
//             <Link className={Style.logoutBtn}>logout</Link>
//           </div>
//         </div>

//         <div className={Style.profileInfoDiv}>
//             <p>{username}</p>

//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import Style from "../App.module.css";
import { Link, useNavigate } from "react-router-dom";

function ProfilePage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUserName(storedUser.name);
      setEmail(storedUser.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login"); // Redirect to login page after logout
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
          <Link className={Style.userProfileBtn} to="/mainPage">Home</Link>
            <Link className={Style.userProfileBtn} to="/ProfilePage">
              Profile
            </Link>
            <Link className={Style.logoutBtn} to="/">logout</Link>

          </div>
        </div>

        <div className={Style.profileInfoDiv}>
          <p className={Style.usernamePara}>{`Hello ${username},`}</p>
          <p className={Style.userEmailPara}>{`Email : ${email}`}</p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

