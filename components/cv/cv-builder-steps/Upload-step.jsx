"use client";

import { FaUpload, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
// import DefaultResumeData from '../utility/DefaultResumeData';
// import { ResumeContext } from '../context/ResumeContext';
import { CoverLetterContext } from "../../context/CoverLetterContext";
import DefaultCoverLetterData from "../../utility/DefaultCoverLetterData";

export default function UploadStep({ onNext, onBack, onChange, value }) {
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const { setCoverLetterData } = useContext(CoverLetterContext);
  const coverletterId = router.query.id || localStorage.getItem("id");
  if (!coverletterId) {
    toast.error("CoverLetter ID or token not found");
    return;
  }
  const handleStartFromScratch = () => {
    setCoverLetterData(DefaultCoverLetterData);
    router.push(`/dashboard/cvaibuilder/${coverletterId}`);
  };

  return (
    <div className="space-y-6 bg-gradient-to-b from-white to-blue-100">
      <div className="text-center bg-primary pt-4 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-white">
          Are you uploading an existing cover letter?
        </h2>
        <p className="mt-2 text-white">
          Just review, edit, and update it with new information
        </p>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            onChange("upload");
            onNext();
          }}
          className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUpload className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">Yes, upload from my cover letter</h3>
          <p className="text-gray-600 text-sm">
            We will give you expert guidance to fill out your info and enhance
            your cover letter.
          </p>
        </button>

        <button
          onClick={handleStartFromScratch}
          className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaFileAlt className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">No, start from scratch</h3>
          <p className="text-gray-600 text-sm">
            We will guide you through the whole process so your skills can shine
          </p>
        </button>
      </div> */}
      <div className="flex justify-center items-center">
        <button
          onClick={handleStartFromScratch}
          className="p-6 border-2 rounded-lg text-center hover:border-primary"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaFileAlt className="text-primary w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">No, start from scratch</h3>
          <p className="text-gray-600 text-sm">
            We will guide you through the whole process so your skills can shine
          </p>
        </button>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}
