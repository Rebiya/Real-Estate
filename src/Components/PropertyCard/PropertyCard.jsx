import React from "react";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${card.id}`)}
    >
      <img src={card.image_url} alt="property" />

      <span className="secondaryText r-price">
        <span>{card.price}</span>
        <span style={{ color: "orange", marginLeft: "5px" }}>ETB</span>
      </span>
      <span className="primaryText">{card.title}</span>
      <span className="secondaryText">{card.city}, {card.country}</span>
    </div>
  );
};

export default PropertyCard;