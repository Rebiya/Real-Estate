import React from "react";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";
const PropertyCard = ({ card }) => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="flexColStart r-card">
        <img src={card.image} alt="home" />

        <span className="secondaryText r-price">
          <span>{card.price}</span>
          <span style={{ color: "orange", marginLeft: "5px" }}>ETB</span>
        </span>
        <span className="primaryText">{card.name}</span>
        <span className="secondaryText">{card.detail}</span>
      </div>
    </div>
  );
};

export default PropertyCard;
