import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-0pzoivijvtzw52xl.us.auth0.com"
      clientId="vO9z2qXjxBMDbbI4Xvn6NhFUCRM348Ex"
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}
      audience="https://localhost:8000/swagger/index.html"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
