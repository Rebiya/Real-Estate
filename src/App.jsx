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
import Property from "./Pages/Property/Property";
import AboutUs from "./Pages/AboutUs/AboutUs";
import { ReactQueryDevtools } from "react-query/devtools";
import AddPropertyModal from "./Components/AddPropertyModal/AddPropertyModal";
import AdminDashBoard from "./Pages/AdminDashBoard/AdminDashBoard";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          primaryColor: "blue"
        }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Use Layout as the parent route */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Websites />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route
                    path="/properties/:propertyid"
                    element={<Property />}
                  />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route
                    path="/AddPropertyModal"
                    element={<AddPropertyModal />}
                  />
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
