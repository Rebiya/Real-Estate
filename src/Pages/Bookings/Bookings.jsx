import { useAuth0 } from "@auth0/auth0-react";

const Bookings = () => {
  const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const fetchData = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch("https://realestate-backend-8b6m.onrender.com/api/Property", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default Bookings;
