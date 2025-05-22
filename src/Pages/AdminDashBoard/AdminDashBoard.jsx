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
import Modal from 'react-modal';

Modal.setAppElement('#root'); 


const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();
  const { data: properties, isLoading, refetch } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null); // for modal


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
  if (isDeleting) return;

  // Set the property to confirm in modal
  const property = properties.find(p => p.id === id);
  setSelectedProperty(property);
};

// Confirm and delete after user confirms in modal
const confirmDelete = async () => {
  if (!selectedProperty) return;

  try {
    setIsDeleting(true);
    const token = await getAccessTokenSilently();
    await deleteProperty(selectedProperty.id, token);
    toast.success("Property deleted successfully!");
    refetch();
  } catch (error) {
    toast.error(error.message || "Failed to delete property");
    console.error("Delete error:", error);
  } finally {
    setIsDeleting(false);
    setSelectedProperty(null); // close modal
  }
};

const cancelDelete = () => {
  setSelectedProperty(null);
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
        <div className="sidebar-header">users
          <h2>NovaNest</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li onClick={openCalendly}>Schedules</li>
          <li onClick={() => navigate("/users")}>Customers</li>
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
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting...' : <><FaTrash /> Delete</>}
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
      <Modal
  isOpen={!!selectedProperty}
  onRequestClose={cancelDelete}
  contentLabel="Confirm Delete"
  className="delete-modal"
  overlayClassName="modal-overlay"
>
  <h2>Confirm Deletion</h2>
  <p>Are you sure you want to delete <strong>{selectedProperty?.title}</strong>?</p>
  <div className="modal-buttons">
    <button onClick={confirmDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Yes, Delete'}
    </button>
    <button onClick={cancelDelete}>Cancel</button>
  </div>
</Modal>

    </div>
  );
};

export default AdminDashBoard;