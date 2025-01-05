import React, { useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import data from "../../utils/slider.json";
// import useProperties from "../../hooks/useProperties";

const Properties = () => {
  // const { isLoading } = useProperties;
  const [filter, setFilter] = useState("");
  if (!data) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data
            .filter((property) => {
              // Ensure the necessary fields exist before accessing them
              const name = property?.name || ""; // Default to empty string if undefined
              const detail = property?.detail || "";
              const price = property?.price || "";

              // Filter logic
              return (
                name.toLowerCase().includes(filter.toLowerCase()) ||
                detail.toLowerCase().includes(filter.toLowerCase()) ||
                price.toLowerCase().includes(filter.toLowerCase())
              );
            })
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
