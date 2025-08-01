import React, { useEffect, useState } from "react";
import Builder from "./builder";
import Loder from "./Loder";
import Home_first from "./Home/Home_first";
import FAQ from "./Home/FAQ/FAQ_Component.jsx";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import DashboardPage from "./dashboard";

import Login from "./login/index.jsx";

const ResumeBuilder = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    // Extract the token directly from the URL
    const url = window.location.href;
    const tokenFromUrl = url.split("/?")[1]; // Gets the token part after `/?`

    if (tokenFromUrl) {
      // Save token to localStorage and state
      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
    } else if (typeof window !== "undefined") {
      // Retrieve token from localStorage if not found in URL
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return null; // Exit if no token
  }
  console.log(token);
  // if (router.query.id) {
  //   return null;
  // }
  return (
    <>
      {/* <Navbar />
      <Home_first /> */}
      <DashboardPage />
      {/* <Login /> */}
      {/* 
    <Home_first/>
    <FAQ/> */}
      {/* <Loder/>  */}
      {/* <Footer/> */}
    </>
  );
};

export default ResumeBuilder;
