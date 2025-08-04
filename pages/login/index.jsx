import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "./logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import Signup from "./Signup";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isThirdstepOpen, setThirdstepOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isChecked, setIsChecked] = useState(false); // Track the checkbox state
  const BASE_URL = "https://api.abroadium.com";
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/jobseeker/auth/login-otp`,
        formData
      );

      if (response.data.code == 200) {
        console.log(response);
        toast.success(response.data.message || "Otp sent to your email.");
        localStorage.setItem("userEmail", formData.email);
        router.push("/login/login-code");
      } else {
        toast.error("Failed to sent otp");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = async () => {
    const url = `${BASE_URL}/api/jobseeker/auth/google`;

    try {
      const response = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Google sign-in token: ", response.data.data);
        // window.open(response.data.data);
        window.location.href = response.data.data;
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-full">
        <div className="p-8 rounded-xl w-full max-w-lg bg-white">
          <div className="flex justify-center mb-6">
            <Image src={logo} className="w-40 h-10" alt="Logo" />
          </div>
          <div className="text-2xl text-black text-center font-bold mb-4">
            Welcome Back
          </div>
          <p className="text-black text-base text-center mb-6">
            People across the globe are joining us to upgrade their career with
            our Robust AI.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black mb-2">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email ID"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={isChecked} // Controlled checkbox
                onChange={handleCheckboxChange} // Handle checkbox state change
                className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the{" "}
                <Link
                  href="/terms&conditions"
                  className="text-blue-500 underline"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Conditional Message if checkbox is not checked */}
            {/* {!isChecked && (
              <div className="text-red-500 text-sm mt-2">
                You must agree to the Terms & Conditions to continue.
              </div>
            )} */}

            <button
              type="submit"
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 relative ${
                !isChecked && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isLoading || !isChecked} // Disable if not checked
            >
              {isLoading ? "Loading..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
      {/* <Modal isOpen={isThirdstepOpen} onClose={() => setThirdstepOpen(false)}>
        <Signup />
      </Modal> */}
    </>
  );
};

export default Login;
