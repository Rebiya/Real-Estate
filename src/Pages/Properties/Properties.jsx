import React, { useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../Components/PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";

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

  const propertyList = Array.isArray(data) ? data : [];

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="properties-container">
          {propertyList
            .filter((property) => {
              const title = property?.title || "";
              const city = property?.city || "";
              const subcity = property?.subcity || "";
              const price = property?.price?.toString() || "";

              return (
                title.toLowerCase().includes(filter.toLowerCase()) ||
                city.toLowerCase().includes(filter.toLowerCase()) ||
                subcity.toLowerCase().includes(filter.toLowerCase()) ||
                price.includes(filter)
              );
            })
            .map((property, i) => (
              <PropertyCard card={property} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;