import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ onClose }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update login state
  };
  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-[#002a48] border-b-2 rounded font-semibold text-white"
      : "flex items-center p-2 hover:bg-[#002a48]  border-b-2 rounded font-semibold  ";
  };

  return (
    <div className="bg-white h-screen p-4 border-r border-gray-200 md:block">
      {/* Sidebar links */}
      <ul className="space-y-2 mt-4">
        <li>
          <Link
            href=""
            className="flex items-center p-2 bg-blue-900 border-b-2 border-black font-semibold text-white"
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-10 ">🖥️</span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/page"
            className={getLinkClassName("/dashboard/page")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👤</span>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="aibuilder"
            className={getLinkClassName("/dashboard/aibuilder")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🤖</span>
            <span>AI Resume Builder</span>
          </Link>
        </li>
        <li>
          <Link
            href="resumelist"
            className={getLinkClassName("/dashboard/resumelist")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📑</span>
            <span>My Resumes</span>
          </Link>
        </li>
        <li>
          <Link
            href="notification"
            className={getLinkClassName("/dashboard/notification")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🔔</span>
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link
            href="skilltest"
            className={getLinkClassName("/dashboard/skilltest")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📝</span>
            <span>Skill Test</span>
          </Link>
        </li>
        <li>
          <Link
            href="addrefferal"
            className={getLinkClassName("/dashboard/addrefferal")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👥</span>
            <span>Add Referral</span>
          </Link>
        </li>
        <li>
          <Link
            href="skillhistorylist"
            className={getLinkClassName("/dashboard/skillhistorylist")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📊</span>
            <span>Skill history</span>
          </Link>
        </li>
        <li>
          <Link
            href="reffrerallistpage"
            className={getLinkClassName("/dashboard/reffrerallistpage")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👥</span>
            <span>Referral List</span>
          </Link>
        </li>
        <li>
          <Link
            href="paymentpage"
            className={getLinkClassName("/dashboard/paymentpage")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">💳</span>
            <span>Payment</span>
          </Link>
        </li>
        <li>
          <Link
            href="password"
            className={getLinkClassName("/dashboard/password")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🔑</span>
            <span>Change Password</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center p-2 hover:bg-[#002a48]  border-b-2 rounded font-semibold"
            onClick={() => {
              handleLogout();
            }}
          >
            <span className="mr-2 ">🔓</span>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
