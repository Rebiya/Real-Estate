import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import Layout from "./Components/Layout/Layout";
import Websites from "./Pages/Landing/Websites";
import Properties from "./Pages/Properties/Properties";
import Bookings from "./Pages/Bookings/Bookings";
import "./App.css";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AddProperties from "./Components/AddProperties/AddProperties";
import AdminDashBoard from "./Pages/AdminDashBoard/AdminDashBoard"
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              {/* Use Layout as the parent route */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Websites />} />
                <Route path="properties" element={<Properties />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/AddProperties" element={<AddProperties />} />
                <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </MantineProvider>
  );
}

export default App;
