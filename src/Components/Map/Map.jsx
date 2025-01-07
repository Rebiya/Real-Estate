import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";
import "./Map.css";
const Map = ({ city, subcity, country }) => {
  return (
    <div className="map">
      <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={true}
        style={{
          height: "60vh",
          width: "160%",
          maxWidth: "800px",
          position: "relative",
          zIndex: 0
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker city={city} subcity={subcity} country={country} />
      </MapContainer>
    </div>
  );
};

export default Map;
