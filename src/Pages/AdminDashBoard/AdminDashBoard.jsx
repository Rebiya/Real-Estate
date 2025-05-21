import React, { useState } from "react";
import { FaSearch, FaUpload, FaTrash, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";
import { GiReturnArrow } from "react-icons/gi";
import useAuthCheck from "../../hooks/useAuthCheck";
import useProperties from "../../hooks/useProperties";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteProperty } from "../../utils/api";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();
  const { data: properties, isLoading, refetch } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getImageUrl = (image_url) => {
    if (!image_url) return '/default-property.jpg';
    if (image_url.startsWith('http://') || image_url.startsWith('https://')) {
      return image_url;
    }
    return `http://localhost:3000${image_url.startsWith('/') ? '' : '/'}${image_url}`;
  };

  const filteredProperties = properties?.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.propertyType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPropertyClick = () => {
    if (!validateLogin()) {
      toast.error("You need to log in to upload properties!");
      return;
    }
    navigate("/AddPropertyModal");
  };

  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteProperty(id, token);
      refetch();
      toast.success("Property deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete property");
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const openCalendly = () => {
    window.open("https://calendly.com/event_types/user/me", "_blank");
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>NovaNest</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li onClick={openCalendly}>Schedules</li>
          <li>Customers</li>
        </ul>
        <button className="upload-button" onClick={handleAddPropertyClick}>
          <FaUpload /> Upload Properties
        </button>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <div className="navbar-left">
            <button className="menu-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch />
            </button>
          </div>
          <div className="navbar-right">
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>

        <div className="dashboard-content">
          <h2>Welcome to Admin Dashboard</h2>
          <div className="content-scrollable">
            {isLoading ? (
              <p>Loading properties...</p>
            ) : (
              <div className="property-cards">
                {filteredProperties?.length > 0 ? (
                  filteredProperties.map((property) => (
                    <div className="property-card" key={property.id}>
                      <img
                        src={getImageUrl(property.image_url)}
                        alt={property.title}
                        className="property-image"
                        onError={(e) => {
                          e.target.src = '/default-property.jpg';
                          e.target.onerror = null;
                        }}
                      />
                      <div className="property-details">
                        <h3>{property.title || 'Untitled Property'}</h3>
                        <p>Price: {property.price || 'N/A'}</p>
                        <div className="buttons">
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(property.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                          <button 
                            className="return-button" 
                            onClick={() => navigate("/")}
                          >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;