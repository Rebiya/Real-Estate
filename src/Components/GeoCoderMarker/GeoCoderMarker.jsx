import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// Set up the default icon for Leaflet markers
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ city, subcity, country }) => {
  const map = useMap();
  const [position, setPosition] = useState(null); // Start with no position
  const address = `${city}, ${subcity}, ${country}`; // Construct the full address

  useEffect(() => {
    // Perform geocoding based on the constructed address
    if (city || subcity || country) {
      ELG.geocode()
        .text(address)
        .run((err, results) => {
          if (err) {
            console.error("Geocoding error:", err);
            return;
          }

          if (results?.results?.length > 0) {
            const { lat, lng } = results.results[0].latlng;
            setPosition([lat, lng]); // Update position with geocoded result
            map.flyTo([lat, lng], 10); // Fly to the new position with zoom level 10
          } else {
            console.error("No results found for the given address.");
          }
        });
    }
  }, [address, map]);

  return position ? (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  ) : null; 
};

export default GeoCoderMarker;
