import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Bell, LayoutDashboard, LogOut, User, Settings } from "lucide-react";
import axios from "axios";
import AbroadiumId from "./AbroadiumId";
import { BsDash } from "react-icons/bs";
import logo from "./logo.png";
import Image from "next/image";
// Create axios instance with interceptor
const axiosInstance = axios.create();

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState();

  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://api.abroadium.com/api/jobseeker/logout",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem("token");
      router.push("https://airesume.abroadium.com/login");
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
      // Still remove token and redirect even if logout API fails
      localStorage.removeItem("token");
      router.push("https://airesume.abroadium.com/login");
    }
  };

  // Setup axios interceptor
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      const checkApiSuccess = async () => {
        try {
          const response = await axiosInstance.get(
            "https://api.abroadium.com/api/jobseeker/user-profile",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.data.status === "success") {
            setIsApiSuccess(true);
            setUser(response.data.data.personal_details);
          } else {
            setIsApiSuccess(false);
          }
        } catch (error) {
          setIsApiSuccess(false);
          console.error("Error fetching user profile:", error);
          // The 401 error will be handled by the interceptor
        }
      };

      checkApiSuccess();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = () => setIsMenuOpen(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const planName = {
    1: "Free",
    2: "Pay & Download",
    3: "AI Pro Month",
    // 4: "AI Pro Yearly",
  };

  const currentPlan = user?.plan_id ? planName[user.plan_id] : "Free";

  return (
    <nav
      className="bg-transparent shadow-sm"
      // style={{ backgroundColor: "#4C3957" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="abrodium logo"
                className="h-12 w-[200px]"
              />
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-[18px] font-semibold text-black hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/resumelist"
              className="text-[18px] font-semibold text-black hover:text-primary"
            >
              My Resumes
            </Link>
            <Link
              href="/dashboard/cvletterlist"
              className="text-[18px] font-semibold text-black hover:text-primary"
            >
              CoverLetter
            </Link>
            <Link
              href="https://airesume.abroadium.com/job-list"
              className="text-[18px] font-semibold text-black hover:text-primary"
            >
              Jobs
            </Link>
            <Link
              href=""
              onClick={handleOpenPopup}
              className="text-[18px] font-semibold text-black hover:text-primary"
            >
              Abroadium ID
            </Link>
            <AbroadiumId isOpen={isPopupOpen} onClose={handleClosePopup} />
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center  px-4 py-2 text-md font-semibold border-2  rounded-full  transition-all duration-300 z-50
                   justify-center  bg-primary text-white hover:bg-primary/90 "
                >
                  <User />
                  <span className="ml-2">
                    {user ? user.first_name : "profile"}
                  </span>
                </button>

                {/* {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
                    <p>
                      Current Plan:{" "}
                      <span
                        className={`px-2 py-1 rounded ${
                          currentPlan === "Free"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {currentPlan}
                      </span>
                    </p>

                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard className="mr-3 w-5 h-5 text-gray-500 group-hover:text-primary" />
                      <span className="text-gray-800 group-hover:text-primary">
                        Dashboard
                      </span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="mr-3 w-5 h-5 text-gray-500 group-hover:text-primary" />
                      <span className="text-gray-800 group-hover:text-primary">
                        Settings
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <LogOut className="mr-3 w-5 h-5 text-gray-500 group-hover:text-red-600" />
                      <span className="text-gray-800 group-hover:text-red-600">
                        Logout
                      </span>
                    </button>
                  </div>
                )} */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-600">
                        Current Plan:{" "}
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            currentPlan === "Free"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {currentPlan}
                        </span>
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard className="mr-3 w-5 h-5 text-gray-500 group-hover:text-primary" />
                      <span className="text-gray-800 group-hover:text-primary">
                        Dashboard
                      </span>
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="mr-3 w-5 h-5 text-gray-500 group-hover:text-primary" />
                      <span className="text-gray-800 group-hover:text-primary">
                        Settings
                      </span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group border-t border-gray-100"
                    >
                      <LogOut className="mr-3 w-5 h-5 text-gray-500 group-hover:text-red-600" />
                      <span className="text-gray-800 group-hover:text-red-600">
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-black px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Log in
                </Link>
                {/* <Link
                  href="/signup"
                  className="text-black px-4 py-2 text-md font-semibold border-2 rounded-xl "
                >
                  Sign up
                </Link> */}
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300"
            >
              <User />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/dashboard/aibuilder"
                className="text-black block px-3 py-2 rounded-md text-base font-semibold hover:bg-primary"
                onClick={handleLinkClick}
              >
                AI Resume Builder
              </Link>
              <Link
                href="/dashboard/resumelist"
                className="text-black block px-3 py-2 rounded-md text-base font-semibold hover:bg-primary"
                onClick={handleLinkClick}
              >
                My Resumes
              </Link>
              <Link
                href=""
                className="text-black block px-3 py-2 rounded-md text-base font-semibold hover:bg-primary"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
              <Link
                href=""
                className="text-black block px-3 py-2 rounded-md text-base font-semibold hover:bg-primary"
                onClick={handleLinkClick}
              >
                Blog
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/"
                  className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleLinkClick}
                  >
                    Log in
                  </Link>
                  {/* <Link
                    href="/signup"
                    className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleLinkClick}
                  >
                    Sign up
                  </Link> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
