// "use client";

// import { FaUpload, FaFileAlt } from "react-icons/fa";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import DefaultResumeData from "../utility/DefaultResumeData";
// import { ResumeContext } from "../context/ResumeContext";
// import FullScreenLoader from "../ResumeLoader/Loader";

// export default function UploadStep({ onNext, onBack, onChange, value }) {
//   const router = useRouter();
//   const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);
//   const { setResumeData } = useContext(ResumeContext);
//   const resumeId = router.query.id || localStorage.getItem("resumeId");
//   if (!resumeId) {
//     toast.error("Resume ID or token not found");
//     return;
//   }

//   const handleStartFromScratch = () => {
//     setShowLoader(true);
//     setResumeData(DefaultResumeData);
//     setTimeout(() => {
//       router.push(`/dashboard/aibuilder/${resumeId}`);
//     }, 3000);
//   };

//   return (
//     <>
//       {showLoader && <FullScreenLoader />}
//       <div className="space-y-6 bg-gradient-to-b from-white to-blue-100 ">
//         <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>
//         <div className="text-centerpt-4 pb-4 mb-4">
//           <h2 className="text-2xl font-bold text-white">
//             Are you uploading an existing resume?
//           </h2>
//           <p className="mt-2 text-white">
//             Just review, edit, and update it with new information
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => {
//               onChange("upload");
//               onNext();
//             }}
//             className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
//               <FaUpload className="text-blue-600 w-8 h-8" />
//             </div>
//             <h3 className="font-bold mb-2">Yes, upload from my resume</h3>
//             <p className="text-gray-600 text-sm">
//               We will give you expert guidance to fill out your info and enhance
//               your resume
//             </p>
//           </button>

//           <button
//             onClick={handleStartFromScratch}
//             className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
//               <FaFileAlt className="text-blue-600 w-8 h-8" />
//             </div>
//             <h3 className="font-bold mb-2">No, start from scratch</h3>
//             <p className="text-gray-600 text-sm">
//               We will guide you through the whole process so your skills can
//               shine
//             </p>
//           </button>
//         </div>

//         <div className="flex justify-between mt-8">
//           <button
//             onClick={onBack}
//             className="px-6 py-2 border rounded-lg hover:bg-gray-50"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { FaUpload, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import DefaultResumeData from "../utility/DefaultResumeData";
import { ResumeContext } from "../context/ResumeContext";
import FullScreenLoader from "../ResumeLoader/Loader";

export default function UploadStep({ onNext, onBack, onChange, value }) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const { setResumeData } = useContext(ResumeContext);

  const resumeId = router.query.id || localStorage.getItem("resumeId");

  if (!resumeId) {
    toast.error("Resume ID or token not found");
    return null;
  }

  const handleStartFromScratch = () => {
    setShowLoader(true);
    setResumeData(DefaultResumeData);
    setTimeout(() => {
      router.push(`/dashboard/aibuilder/${resumeId}`);
    }, 3000);
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}

      <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
        <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Are you uploading an existing resume?
            </h2>
            <p className="text-md md:text-lg text-[#4b5563] mb-10">
              Just review, edit, and update it with new information
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl w-full">
            {/* Upload Existing Resume */}
            <button
              onClick={() => {
                onChange("upload");
                onNext();
              }}
              className="w-full p-6 rounded-2xl shadow-md bg-blue-200 
              hover:bg-primary hover:text-white hover:shadow-xl 
              flex flex-col items-center text-primary font-semibold
              transition-all duration-300 ease-in-out transform hover:scale-105 group"
            >
              <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUpload className="text-blue-600 w-8 h-8 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Yes, upload my resume</h3>
              <p className="text-sm text-center">
                We will guide you to improve and update your resume
              </p>
            </button>

            {/* Start From Scratch */}
            <button
              onClick={handleStartFromScratch}
              className="w-full p-6 rounded-2xl shadow-md bg-blue-200 
              hover:bg-primary hover:text-white hover:shadow-xl 
              flex flex-col items-center text-primary font-semibold
              transition-all duration-300 ease-in-out transform hover:scale-105 group"
            >
              <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-blue-600 w-8 h-8 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">No, start from scratch</h3>
              <p className="text-sm text-center">
                We’ll help you build a professional resume from the ground up
              </p>
            </button>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
                font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
