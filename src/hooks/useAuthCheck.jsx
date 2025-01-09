import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Custom Hook for Handling Authentication and Token Removal
const useAuthCheck = () => {
  const { isAuthenticated, logout } = useAuth0();

  // Function to clear all authentication-related data on logout
  const handleLogout = () => {
    // Clear session or local storage tokens if you're storing them manually
    localStorage.clear();
    sessionStorage.clear();

    // Optional: Manually delete custom cookies if needed
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "another_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Log out from Auth0
    logout({ returnTo: window.location.origin });
  };

  // Automatically logout when the window or tab is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Perform logout when the window/tab is closed
      logout({ returnTo: window.location.origin });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [logout]);

  // Validate login state
  const validateLogin = () => {
    // Check if the toast has already been shown in this session
    if (!isAuthenticated && !sessionStorage.getItem("toastShown")) {
      toast.error("You must be logged in", { position: "bottom-right" });
      sessionStorage.setItem("toastShown", "true"); // Mark the toast as shown
      return false;
    }
    return true;
  };

  return { validateLogin, handleLogout };
};

export default useAuthCheck;
