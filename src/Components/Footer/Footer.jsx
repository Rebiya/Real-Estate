import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText"> Addis Ababa, Ethiopia</span>
          <div className="flexCenter f-menu">
            <Link to="/AdminDashBoard">
              <button className="styled-button">Staff </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
