import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User, Bell, CreditCard, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-primary border-b-2 rounded font-semibold text-white"
      : "flex items-center p-2 hover:bg-success/90 hover:text-white border-b-2 rounded font-semibold";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {/* <button
        className="md:hidden p-2 fixed top-[7rem] left-4 z-50 bg-primary text-white rounded-full"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}
      {!isOpen && (
        <button
          className="md:hidden p-2 fixed top-[7rem] left-4 z-50 bg-primary text-white rounded-full"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-0 right-4 text-gray-600"
          onClick={toggleSidebar}
        >
          <X size={24} />
        </button>

        {/* Sidebar links */}
        <ul className="space-y-2 mt-4">
          <li>
            <Link
              href="/settings/account"
              className="flex items-center p-2 bg-success border-b-2 border-black font-semibold text-white rounded-xl"
              onClick={toggleSidebar}
            >
              <User className="mr-2" size={20} />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings/notification"
              className={`rounded-xl ${getLinkClassName(
                "/settings/notification"
              )}`}
              onClick={toggleSidebar}
            >
              <Bell className="mr-2" size={20} />
              <span>Notification</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings/subscription"
              className={`rounded-xl ${getLinkClassName(
                "/settings/subscription"
              )}`}
              onClick={toggleSidebar}
            >
              <CreditCard className="mr-2" size={20} />
              <span>Subscription</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
