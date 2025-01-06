import React, { useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { getAllProperties } from "../../utils/api";
const Properties = () => {
  const { isLoading, isError, data } = useProperties();
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
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

  // Ensure data is always an array
  const propertyList = Array.isArray(data) ? data : [];

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="properties-container">
          {propertyList
            .filter((property) => {
              const title = property?.title || "";
              const Location = property?.Location || "";
              const price = property?.price?.toString() || "";
              const status = property?.status || "";

              return (
                title.toLowerCase().includes(filter.toLowerCase()) ||
                Location.toLowerCase().includes(filter.toLowerCase()) ||
                price.includes(filter) ||
                status.toLowerCase().includes(filter.toLowerCase())
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
