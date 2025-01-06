import React from "react";
import data from "../../utils/slider.json";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../Components/Map/Map";
import img from "../../assets/r1.png";

const Property = () => {
  const singleData = data[0];
  const calendlyLink = "https://calendly.com/rebum-19/30min?month=2025-01";

  const handleBookVisit = () => {
    // Initialize the Calendly popup widget
    window.Calendly.initPopupWidget({ url: calendlyLink });
    return false; // Prevent default button behavior
  };

  return (
    <div className="wrapper property-wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Image */}
        <img src={img} alt="home image" />
        <div className="flexCenter property-details">
          {/* Left Section */}
          <div className="flexColStart left" style={{ width: "50%" }}>
            <div className="flexStart head">
              <span className="primaryText">{singleData?.title}</span>
              <span
                className="orangeText"
                style={{ color: "orange", marginLeft: "5px" }}
              >
                {singleData?.price} ETB
              </span>
            </div>
            {/* Facilities */}
            <div className="flexStart facilities">
              {/* Bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{singleData?.bathroom} Bathrooms</span>
              </div>

              {/* Rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{singleData?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* Description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {singleData?.descripton}
            </span>

            {/* Address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {singleData?.location} {"  "} {singleData?.propertyType}
              </span>
            </div>

            {/* Bookings */}
            <button className="button" onClick={handleBookVisit}>
              Book your visit
            </button>
          </div>

          {/* Right Side */}
          <div style={{ width: "50%" }}>
            <Map address={singleData?.location} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
