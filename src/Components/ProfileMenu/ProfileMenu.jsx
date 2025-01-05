import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa6";
import OutsideClickHandler from "react-outside-click-handler";
const ProfileMenu = ({ logout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
        <FaHouseUser size={40} />
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
        setIsOpen(false);
        }}
      >
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              zIndex: "1000",
              width: "150px"
            }}
          >
            <div
              onClick={() => {
                navigate("/bookings", { replace: true });
                setIsOpen(false);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#fff",
                color: "blue"
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
            >
              Bookings
            </div>
            <div
              onClick={handleLogout}
              style={{
                padding: "10px",
                cursor: "pointer",
                color: "red",
                backgroundColor: "#fff"
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
            >
              Logout
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default ProfileMenu;
