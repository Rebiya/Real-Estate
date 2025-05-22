import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Property.css";
import { FaShower, FaParking } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../Components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import { PopupWidget } from "react-calendly";
import { toast } from "react-toastify";

// Axios instance
const api = axios.create({
  baseURL: "https://realestate-backend-8b6m.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const Property = () => {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/residencies/${id}`);
        const data = response.data;

        if (!data) throw new Error("No data received from server");

        setPropertyData(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch property details";
        setError(errorMessage);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const handleBookingClick = () => {
    if (isAuthenticated) {
      setShowCalendly(true);
    } else {
      loginWithRedirect();
    }
  };

  if (loading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <div className="loader"></div>
        <span className="secondaryText" style={{ marginTop: "1rem" }}>
          Loading property details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <span className="secondaryText" style={{ color: "red" }}>
          Error: {error}
        </span>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <span className="secondaryText">No property data available</span>
      </div>
    );
  }

  return (
    <div className="wrapper property-wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Property Image */}
        <img
          src={propertyData.image_url || "https://via.placeholder.com/800x500"}
          alt={propertyData.title || "Property image"}
          className="property-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x500";
          }}
        />

        <div className="flexCenter property-detail">
          {/* Left Column */}
          <div className="flexColStart left" style={{ width: "50%" }}>
            <div className="flexStart head">
              <span className="primaryText">{propertyData.title || "Untitled Property"}</span>
              <span className="orangeText" style={{ marginLeft: "5px" }}>
                {propertyData.price ? `${propertyData.price} ETB` : "Price not available"}
              </span>
            </div>

            {/* Facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{propertyData.bathrooms || 0} Bathroom(s)</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{propertyData.bedrooms || 0} Bedroom(s)</span>
              </div>
              <div className="flexStart facility">
                <FaParking size={20} color="#1F3E72" />
                <span>{propertyData.parking || 0} Parking spot(s)</span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {propertyData.description || "No description available."}
            </span>

            <div className="flexStart" style={{ gap: "1rem", marginTop: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {[propertyData.subcity, propertyData.city, propertyData.country]
                  .filter(Boolean)
                  .join(", ") || "Location not specified"}
              </span>
            </div>

            <div className="flexColStart" style={{ marginTop: "1rem" }}>
              {propertyData.user_email && (
                <span className="secondaryText">
                  <strong>Listed by:</strong> {propertyData.user_email}
                </span>
              )}
              {propertyData.updated_at && (
                <span className="secondaryText">
                  <strong>Last updated:</strong>{" "}
                  {new Date(propertyData.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Book Visit Button */}
            <button
              className="button"
              style={{ marginTop: "1.5rem" }}
              onClick={handleBookingClick}
            >
              Book Your Visit
            </button>

            {/* Calendly PopupWidget */}
            {showCalendly && (
              <PopupWidget
                url="https://calendly.com/rebum-19/realestate"
                rootElement={document.getElementById("root")}
                text="Schedule time"
                textColor="#ffffff"
                color="#00a2ff"
              />
            )}
          </div>

          {/* Right Column - Map */}
          <div style={{ width: "50%" }}>
            <Map
              city={propertyData.city}
              subcity={propertyData.subcity}
              country={propertyData.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
