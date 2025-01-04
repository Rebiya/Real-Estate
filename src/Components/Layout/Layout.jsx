import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
