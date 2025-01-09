import React, { useState, useEffect } from "react";
import { FaSearch, FaUpload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";
import { GiReturnArrow } from "react-icons/gi";
import useAuthCheck from "../../hooks/useAuthCheck";
import useProperties from "../../hooks/useProperties.jsx";
import AddPropertyModal from "../../Components/AddPropertyModal/AddPropertyModal.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"; // Ensure axios is imported

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { validateLogin } = useAuthCheck();
  const { data } = useProperties();
  const [properties, setProperties] = useState([]);

  // Fetch the token and properties when the component mounts
  useEffect(() => {
    const fetchTokenAndProperties = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token) {
          setProperties(data); // assuming data is an array of property objects
        }
      } catch (error) {
        console.error("Error fetching token or properties", error);
      }
    };
    fetchTokenAndProperties();
  }, [getAccessTokenSilently, data]);

  const handleAddPropertyClick = () => {
    if (!validateLogin()) {
      toast.error("You need to log in to upload properties!");
      return;
    }
    navigate("/AddPropertyModal");
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      if (!token) {
        toast.error("You need to be logged in to delete a property.");
        return;
      }

      // Make the API call to delete the property
      await axios.delete(`/Property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the Authorization header with the token
        }
      });

      // If successful, remove the property from the state
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== id)
      );

      toast.success("Property deleted successfully!");
    } catch (error) {
      // Handle any errors and show a toast notification
      toast.error(
        "Something went wrong while deleting property, Please try again."
      );
      console.error("Error deleting property", error);
    }
  };

  const handleReturn = () => {
    navigate("/");
  };

  const openCalendly = () => {
    window.open("https://calendly.com/event_types/user/me", "_blank");
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
        <button className="upload-button" onClick={handleAddPropertyClick}>
          <FaUpload /> Upload Properties
        </button>
        <button
          className="upload-button"
          style={{ marginTop: "5px" }}
          onClick={openCalendly}
        >
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
            {properties.length > 0 ? (
              properties.map((property) => (
                <div className="property-card" key={property.id}>
                  <img
                    src={property.imgurl}
                    alt={property.title}
                    className="property-image"
                  />
                  <div className="property-details">
                    <h3>{property.title}</h3>
                    <p>Price: {property.price}</p>
                    <div className="buttons">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(property.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                      <button className="return-button" onClick={handleReturn}>
                        <GiReturnArrow /> Return
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
