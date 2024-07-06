import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/mainPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Here we are going to have various routes */}
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
