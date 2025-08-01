"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios"; // Import Axios
import logo from "./logo.png";
import { useRouter } from "next/router";
const LoginCode = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://api.abroadium.com";
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  const handleSignIn = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/jobseeker/auth/login-verify-otp`,

        { email, otp }
      );

      const token = response.data?.data?.token;

      localStorage.setItem("token", token);

      router.push(`/dashboard`);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );

      router.push("/login"); // Redirect to the login page on error
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/login"
          className="text-blue-600 flex items-center mb-6 hover:text-blue-700"
        >
          <span className="mr-2">←</span> Back
        </Link>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={100}
            className="h-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Sign in with login code
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We have sent your one-time passcode to <br />
          <strong className="text-blue-700">{email}</strong>. This passcode will
          expire after 5 minutes.
        </p>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Enter 6-digit code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className="w-full text-center text-xl py-2 px-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="______"
          />
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
          // disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* Resend Code */}
        {/* <p className="text-center text-sm mt-4">
          <button className="text-blue-600 font-semibold hover:text-blue-700">
            Don&apos;t have access to this email?
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default LoginCode;
