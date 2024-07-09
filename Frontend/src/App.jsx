import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/mainPage";
import LoginPage from "./Components/login";
import CreateAccount from "./Components/createAccount";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Here we are going to have various routes */}
          <Route path="/" element={<MainPage/>}/>
          <Route path="/loginPage" element={<LoginPage/>}/>
          <Route path="/createAccount" element={<CreateAccount/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
