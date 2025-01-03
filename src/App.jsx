import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
