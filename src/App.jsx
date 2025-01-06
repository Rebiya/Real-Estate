import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import Layout from "./Components/Layout/Layout";
import Websites from "./Pages/Landing/Websites";
import Properties from "./Pages/Properties/Properties";
import Bookings from "./Pages/Bookings/Bookings";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./Components/Property/Property";
import AboutUs from "./Pages/AboutUs/AboutUs";
import { ReactQueryDevtools } from "react-query/devtools";
import AddProperties from "./Components/AddProperties/AddProperties";
import AdminDashBoard from "./Pages/AdminDashBoard/AdminDashBoard";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Use Layout as the parent route */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Websites />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/property/:propertyid" element={<Property />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/AddProperties" element={<AddProperties />} />
                  <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
