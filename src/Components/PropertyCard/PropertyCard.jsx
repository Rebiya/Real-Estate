import React from "react";
import "./PropertyCard.css";
import { truncate } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
const PropertyCard = ({ card }) => {
  console.log(card);
  const navigate = useNavigate();
  const { propertyid } = useParams();

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${propertyid}`)}
    >
      <img src={card.imgurl} alt="home" />

      <span className="secondaryText r-price">
        <span>{card.price}</span>
        <span style={{ color: "orange", marginLeft: "5px" }}>ETB</span>
      </span>
      <span className="primaryText">{card.title}</span>
      <span className="secondaryText">{card.status}</span>
    </div>
  );
};

export default PropertyCard;
