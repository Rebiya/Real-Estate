import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const headerColor = useHeaderColor();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* Logo */}
        <Link to="/">
          <img src="./logo3.png" alt="logo" width={100} height={60} />
        </Link>

        {/* Menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/AboutUs">AboutUs</NavLink>
            <NavLink to="/Properties">Properties</NavLink>
            <NavLink to="mailto:rebum.19@gmail.com">Contact</NavLink>

            {/* Conditional Rendering */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <button
                className="button"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            )}
          </div>
        </OutsideClickHandler>

        {/* Menu Icon for Small Screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
