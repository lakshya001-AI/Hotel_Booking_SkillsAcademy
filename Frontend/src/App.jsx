import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/mainPage";
import LoginPage from "./Components/login";
import CreateAccount from "./Components/createAccount";
import AdminPage from "./Components/adminPage";
import AdminUsersPage from "./Components/adminusers";
import ProfilePage from "./Components/profilepage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Here we are going to have various routes */}
          <Route path="/mainPage" element={<MainPage/>}/>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/createAccount" element={<CreateAccount/>}/>
          <Route path="/adminPage" element={<AdminPage/>}/>
          <Route path="/adminUsersPage" element={<AdminUsersPage/>}/>
          <Route path="/ProfilePage" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
