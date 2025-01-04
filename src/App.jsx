import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Websites from "./Pages/Landing/Websites";
import Properties from "./Pages/Properties/Properties";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            {/* Use Layout as the parent route */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Websites />} />
              <Route path="properties" element={<Properties />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
