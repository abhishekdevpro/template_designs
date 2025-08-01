import Navbar from "../../Navbar/Navbar";
import ProfileForm from "../../profile";
import ProfilePage from "../Profile";
import Sidebar from "../Sidebar";


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { FaBars } from 'react-icons/fa'; //
import Builder from "../../builder";

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
          <Navbar/>
        <div className="overflow-y-hidden flex flex-col items-center bg-gray-100">
       
      <Builder/>
    </div>
       
        </div>
    );
}
