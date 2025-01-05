import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div
      style={{
        padding: "2rem",
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        maxWidth: "800px",
        margin: "2rem auto",
        color: "#333",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          background: "linear-gradient(90deg, #FF6FD8, #3813C2)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
      >
        Welcome to NovaNest Real Estate
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "1.2rem", lineHeight: "1.8", textAlign: "justify" }}
      >
        **Your Gateway to Exquisite Living in Ethiopia** At NovaNest Real
        Estate, we believe that finding your dream home should be as thrilling
        and rewarding as living in it. We are your trusted partner in navigating
        the luxurious real estate landscape of Ethiopia. From opulent villas in
        Addis Ababa to serene retreats in the heart of the countryside, our
        extensive portfolio is designed to cater to the diverse needs and
        aspirations of discerning clients like you.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "1rem",
            textAlign: "center",
            background: "linear-gradient(90deg, #42A5F5, #00C853)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          Our Services
        </h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <motion.li
            whileHover={{ scale: 1.05 }}
            style={{
              marginBottom: "1rem",
              padding: "0.8rem",
              background: "#FFEB3B",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            **Investment Advice**: Provide guidance on property investments,
            market trends, and financial planning.
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            style={{
              marginBottom: "1rem",
              padding: "0.8rem",
              background: "#FF8A80",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            **Neighborhood Insights**: Offer detailed information about different
            neighborhoods, including safety, amenities, and community events.
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "0.8rem",
              background: "#80D8FF",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            **Property Management**: Leave the hassle of property management to
            us. Our comprehensive services ensure your investment is
            well-maintained and yields maximum returns.
          </motion.li>
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          marginTop: "2rem",
          textAlign: "center",
          padding: "1rem",
          border: "2px dashed #42A5F5",
          borderRadius: "10px"
        }}
      >
        <p style={{ fontSize: "1rem" }}>
          **Why Choose NovaNest?** Exceptional Quality | Tailored Solutions |
          Expert Guidance
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
