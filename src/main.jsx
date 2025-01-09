import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-0pzoivijvtzw52xl.us.auth0.com" // Your Auth0 domain
      clientId="vO9z2qXjxBMDbbI4Xvn6NhFUCRM348Ex" // Your Auth0 client ID
      authorizationParams={{
        prompt: "select_account", // Forces user to select an account on login
        redirect_uri: `${window.location.origin}` // Redirect back to your app after login
      }}
      audience="https://dev-0pzoivijvtzw52xl.us.auth0.com/api/v2/" // Audience for API calls
      scope="openid profile email" // Permissions your app requests
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
