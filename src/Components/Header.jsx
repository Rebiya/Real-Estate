import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import logo from "../assets/images/download__1_-removebg-preview.png";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const ToggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  return (
    <header className="max-padd-container py-1 px-6 lg:px-12 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      <div className="flexBetween">
        <div>
          <img src={logo} alt="" className="h-24" />
        </div>
        <div className="flexCenter gap-x-4">
          {/* Desktop Navbar */}
          <Navbar containerStyle="hidden xl:flex gap-x-5 xl:gap-x-12 capitalize medium-15" />
          {/* Mobile Navbar */}
          <Navbar
            containerStyle={`${
              menuOpened
                ? "xl:hidden flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/5 transition-all duration-300 cursor-pointer hover:bg-yellow-50"
                : "xl:hidden flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-full p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/5 transition-all duration-300"
            }`}
          />
        </div>
        <div className="flexBetween gap-x-3 sm:gap-x-5 bold-16">
          {/* Mobile Menu Toggle */}
          {!menuOpened ? (
            <MdMenu
              onClick={ToggleMenu}
              className="xl:hidden cursor-pointer text-3xl"
            />
          ) : (
            <MdClose
              onClick={ToggleMenu} // Close menu on X click
              className="xl:hidden cursor-pointer text-3xl"
            />
          )}
          {/* Login Button */}
          <button className="flexCenter gap-x-2 !px-5 btn-dark">
            <LuUserRound className="text-xl" />
            <span>
              <Link to="/login">Login</Link>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
