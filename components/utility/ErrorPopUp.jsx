
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AlertCircle, ArrowUpCircle } from "lucide-react";
import FullScreenLoader from "../ResumeLoader/Loader";
import { SaveLoader } from "../ResumeLoader/SaveLoader";

const ErrorPopup = ({ message, onClose }) => {
  const router = useRouter();
  
  const onUpgrade = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Show loader first
    
    // Close the popup
    onClose();
    
    // Use setTimeout to navigate after showing the loader
    // setTimeout(() => {
      router.push('/payment');
    // }, 3000);
  };

  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
              <AlertCircle className="mr-2" size={20} />
              Error
            </h3>
            
            <p className="text-gray-700 mb-6">
              {message}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onUpgrade}
                className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
              >
                <ArrowUpCircle className="mr-2" size={16} />
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPopup;