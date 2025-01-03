import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = ({ containerStyle }) => {
  return (
    <nav className={`${containerStyle}`}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active-link:py-1" : "py-1")}
      >
        Home
      </NavLink>
      <NavLink
        to={"/listing"}
        className={({ isActive }) => (isActive ? "active-link:py-1" : "py-1")}
      >
        listing
      </NavLink>
      <NavLink
        to={"/mailto:rebum.19@gmail.com"}
        className={({ isActive }) => (isActive ? "active-link:py-1" : "py-1")}
      >
        contact
      </NavLink>
      <NavLink
        to={"/Add-Property"}
        className={({ isActive }) => (isActive ? "active-link:py-1" : "py-1")}
      >
        Add Property
      </NavLink>
    </nav>
  );
};

export default Navbar;
