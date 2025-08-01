// components/ComingSoonPopup.js
import React, { useState } from "react";

const AbroadiumId = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="bg-gradient-to-b from-white to-blue-100"
        style={{
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div className="hero">
          <div className="flex justify-center items-center mb-2">
            <img
              src="https://abroadiumlandingemployee.vercel.app/assets/logo-c5bcd0df.png"
              alt="logo"
              className="h-10 w-40"
            />
          </div>
          <h1>Abroadium ID</h1>
          <p>Your One-Stop Access to Career Solutions</p>
          <p>
            <em>Coming Soon!</em>
          </p>
        </div>
        <div className="progress-container">
          <p>
            <strong>Development Status:</strong> In Progress
          </p>
          <progress value="90" max="100"></progress>
          <p>90% Complete</p>
        </div>
        <p>
          Abroadium ID will allow you to seamlessly connect to all our services
          with a single account. Stay tuned for the launch!
        </p>
        <div className="">
          <p>Want to know when Abroadium ID is live? Sign up for updates!</p>
          <form>
            <input
              type="email"
              name="email"
              style={{
                padding: "10px",
                marginRight: "10px",
                width: "250px",
              }}
              className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email ID"
            />
            <button
              type="submit"
              className="bg-blue-950 text-white px-6 py-2 rounded-lg"
            >
              Notify Me
            </button>
          </form>
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-6 py-2  mt-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AbroadiumId;
