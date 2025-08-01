import Navbar from "../../Navbar/Navbar";
import ProfileForm from "../../profile";
import ProfilePage from "../Profile";
import Sidebar from "../Sidebar";

import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { FaBars } from "react-icons/fa"; //

import CoverLetterBuilder from "../../coverletter-builder";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <div className="">
        <CoverLetterBuilder />
      </div>
    </div>
  );
}
