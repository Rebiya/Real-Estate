import React from "react";
import { FaSearch, FaUpload } from "react-icons/fa";
import "./AdminDashBoard.css"; // For custom styling
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();

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
          {/* Left Section */}
          <div className="left-content">
            <h2>Welcome to Admin Dashboard</h2>

            <div className="property-cards">
              {/* Placeholder Cards */}
              {[...Array(4)].map((_, index) => (
                <div className="property-card" key={index}>
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="Property"
                    className="property-image"
                  />
                  <div className="property-details">
                    <h3>Property {index + 1}</h3>
                    <p>Price: $500,000</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="right-content">
            <div className="calendar-container">
              <iframe
                src="https://calendly.com/your-calendly-link"
                title="Calendly"
                width="100%"
                height="500px"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
