import React from "react";
import Companies from "../../Components/Companies/Companies";
import Contact from "../../Components/Contact/Contact";
import GetStarted from "../../Components/GetStarted/GetStarted";
import Hero from "../../Components/Hero/Hero";
import Residencies from "../../Components/Residencies/Residencies";
import Value from "../../Components/Value/Value";

const Websites = () => {
  return (
    <div>
      <div >
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Websites;
