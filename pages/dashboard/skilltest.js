import Navbar from "../Navbar/Navbar";
import ProfileForm from "../profile";
import ProfilePage from "./Profile";
import Sidebar from "./Sidebar";


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { FaBars } from 'react-icons/fa'; //
import Builder from "../builder";
import Payment from "./Payment";
import Changepassword from "./Changepassword";
import Skills from "./Skills";

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
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full shadow-md">
        <ProfilePage />
      </div>
      <div className="flex flex-1 w-full  mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="p-4 focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Sidebar */}
        <div className={`md:w-64 flex-shrink-0 md:block  ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <Sidebar onClose={closeSidebar} />
        </div>

        {/* Content area */}
        <div className="flex-1 w-full max-w-8xl p-4 overflow-auto">

<Skills/>


        </div>
      </div>
    </div>
       
        </div>
    );
}
