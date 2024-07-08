import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/mainPage";
import LoginPage from "./Components/login";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Here we are going to have various routes */}
          <Route path="/" element={<MainPage/>}/>
          <Route path="/loginPage" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
