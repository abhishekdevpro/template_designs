import React, { useContext, useState, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

const PersonalInformation = () => {
  const {
    coverLetterData,
    setCoverLetterData,
    handleProfilePicture,
    deleteProfilePicture,
  } = useContext(CoverLetterContext);

  const handleChange = (field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        [field]: value,
      },
    }));
  };
  const dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  const fileInputRef = useRef(null);

  // Enhanced delete function that also resets the file input
  const handleDelete = (e) => {
    deleteProfilePicture(e);

    // Reset the file input to clear the filename
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="p-4 md:p-8  rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={coverLetterData?.photo || dummyImage}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
          />

          {coverLetterData?.photo && (
            <button
              onClick={handleDelete}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Delete profile picture"
            >
              ✕
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          name="profileImage"
          accept="image/*"
          className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
          onChange={handleProfilePicture}
        />
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-4 text-white">
        Personal Information
      </h2>
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-white font-medium mb-2">Name</label>
          <input
            type="text"
            value={coverLetterData.personalDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Position</label>
          <input
            type="text"
            value={coverLetterData.personalDetails.position}
            onChange={(e) => handleChange("position", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your position"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white font-medium mb-2">Email</label>
          <input
            type="email"
            value={coverLetterData.personalDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-white font-medium mb-2">Address</label>
          <textarea
            value={coverLetterData.personalDetails.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
            rows="3"
          ></textarea>
        </div>

        {/* Contact Field */}
        <div>
          <label className="block text-white font-medium mb-2">Contact</label>
          <input
            type="tel"
            value={coverLetterData.personalDetails.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact number"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
