import React, { useState } from "react";
import { FaSearch, FaUpload, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  // State for managing property cards
  const [properties, setProperties] = useState(
    [...Array(8)].map((_, index) => ({
      id: index,
      title: `Property ${index + 1}`,
      price: "$500,000",
      image: "https://via.placeholder.com/300x200"
    }))
  );

  // Delete handler
  const handleDelete = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };
  const openCalendly = () => {
    window.open("https://calendly.com/rebum-19", "_blank");
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>NovaNest</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Schedules</li>
          <li>Tickets</li>
          <li>Customers</li>
          <li>Settings</li>
        </ul>
        <button
          className="upload-button"
          onClick={() => navigate("/AddProperties")}
        >
          <FaUpload /> Upload Properties
        </button>
        <button className="upload-button" style={{marginTop:"10px"}} onClick={openCalendly}>
          Open Calendly
        </button>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Navbar */}
        <nav className="dashboard-navbar">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </nav>

        {/* Content Section */}
        <div className="dashboard-content">
          <h2>Welcome to Admin Dashboard</h2>
          <div className="property-cards">
            {properties.map((property) => (
              <div className="property-card" key={property.id}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p>Price: {property.price}</p>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(property.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
