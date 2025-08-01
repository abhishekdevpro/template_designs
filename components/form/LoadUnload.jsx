// // import { FaCloudUploadAlt } from "react-icons/fa";
// // import React, { useContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/router";
// // import { ResumeContext } from "../../pages/builder";
// // import { toast } from "react-toastify";

// // const LoadUnload = () => {
// //   const { setResumeData } = useContext(ResumeContext);
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [isUploaded, setIsUploaded] = useState(false);
// //   const [showOverlay, setShowOverlay] = useState(true);
// //   const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
// //   const [token, setToken] = useState(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (router.query.id) {
// //       return;
// //     }
// //     if (typeof window !== "undefined") {
// //       const storedToken = localStorage.getItem("token");
// //       setToken(storedToken);
// //     }
// //   }, [router.query.id]);

// //   if (router.query.id) {
// //     return null; // Hide component if 'id' is present in query parameters
// //   }

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       toast.error("Please select a file to upload");
// //       return;
// //     }

// //     if (file.type !== "application/pdf") {
// //       toast.error("Please upload a PDF file");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("files", file);

// //     setLoading(true);
// //     setShowLoadingAnimation(true);
// //     try {
// //       const response = await axios.post("https://api.sentryspot.co.uk/api/user/resume-upload", formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           Authorization: token,
// //         },
// //         onUploadProgress: (progressEvent) => {
// //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// //           toast.info(`Upload progress: ${percentCompleted}%`);
// //         },
// //       });

// //       const resumeData = response.data.data[0];
// //       if (!resumeData || !resumeData.resume_parse_data) {
// //         toast.error("Resume data not found in API response");
// //         setLoading(false);
// //         setShowLoadingAnimation(false);
// //         return;
// //       }

// //       const parsedData = JSON.parse(resumeData.resume_parse_data);
// //       setResumeData(parsedData.templateData);
// //       localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
// //       localStorage.setItem("resumeId", resumeData.id);
// //       localStorage.setItem("location", resumeData.file_path);

// //       toast.success("File uploaded successfully");
// //       setIsUploaded(true);
// //       setLoading(false);
// //       setShowLoadingAnimation(false);
// //     } catch (error) {
// //       console.error("Upload error:", error);
// //       toast.error("File upload failed");
// //       setLoading(false);
// //       setShowLoadingAnimation(false);
// //     }
// //   };

// //   const handleStartFromScratch = async () => {
// //     setShowLoadingAnimation(true);
// //     try {
// //       const response = await axios.post(
// //         "https://api.sentryspot.co.uk/api/user/resume-create",
// //         {},
// //         { headers: { Authorization: token } }
// //       );

// //       if (response.data && response.data.data) {
// //         const { id, file_path, ai_resume_parse_data } = response.data.data;

// //         const parsedData = JSON.parse(ai_resume_parse_data).templateData;

// //         setResumeData(parsedData);
// //         localStorage.setItem("resumeData", JSON.stringify(parsedData));
// //         localStorage.setItem("resumeId", id);
// //         localStorage.setItem("location", file_path);

// //         router.push(`/dashboard/aibuilder/${id}`);
// //         setShowLoadingAnimation(false);
// //         toast.success("Started from scratch successfully!");
// //       } else {
// //         throw new Error("Invalid response data format");
// //       }
// //     } catch (error) {
// //       console.error("Error creating resume from scratch:", error);
// //       toast.error("Failed to start from scratch");
// //       setShowLoadingAnimation(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {showLoadingAnimation && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
// //           <div className="loader"></div>
// //           <div className="ms-5 text-white text-center text-lg md:text-2xl">
// //             ☑ Resume information reading <br />
// //             ☑ Analyzing and improving resume content as per industry standards
// //           </div>
// //         </div>
// //       )}

// //       {showOverlay && !isUploaded && !showLoadingAnimation && (
// //         <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-75">
// //           <div className="bg-white p-5 md:p-10 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 text-center">
// //             <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 md:mt-16">Are you uploading an existing resume?</h1>
// //             <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>

// //             <div className="flex flex-col md:flex-row items-center justify-center gap-5">
// //               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
// //                 <div className="mb-4">
// //                   <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
// //                   </svg>
// //                 </div>
// //                 <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
// //                 <p className="text-gray-500 mb-5 text-sm md:text-base">
// //                   We’ll give you expert guidance to fill out your info and enhance your resume, from start to finish
// //                 </p>

// //                 <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-blue-600 transition">
// //                   <FaCloudUploadAlt className="inline-block mr-2" />
// //                   <span>Select Resume (PDF)</span>
// //                   <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
// //                 </label>

// //                 <button
// //                   className={`p-2 mt-4 w-full text-white bg-blue-800 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"}`}
// //                   onClick={handleUpload}
// //                   disabled={loading}
// //                 >
// //                   {loading ? "Uploading..." : "Upload"}
// //                 </button>
// //               </div>

// //               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
// //                 <div className="mb-4">
// //                   <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                   </svg>
// //                 </div>
// //                 <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
// //                 <p className="text-gray-500 text-sm md:text-base">
// //                   We’ll guide you through the whole process so your skills can shine
// //                 </p>
// //                 <button
// //                   className="p-2 w-full mt-8 md:mt-20 text-white bg-yellow-500 rounded hover:bg-red-600 transition"
// //                   onClick={handleStartFromScratch}
// //                 >
// //                   Start From Scratch
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default LoadUnload;

// import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { ResumeContext } from "../../pages/builder";
// import { toast } from "react-toastify";

// const LoadUnload = () => {
//   const { setResumeData } = useContext(ResumeContext);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isUploaded, setIsUploaded] = useState(false);
//   const [showOverlay, setShowOverlay] = useState(true);
//   const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
//   const [token, setToken] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (router.query.id) {
//       return;
//     }
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     }
//   }, [router.query.id]);

//   useEffect(() => {
//     // Extract the token directly from the URL
//     const url = window.location.href;
//     const tokenFromUrl = url.split("/?")[1]; // Gets the token part after `/?`

//     if (tokenFromUrl) {
//       // Save token to localStorage and state
//       localStorage.setItem("token", tokenFromUrl);
//       setToken(tokenFromUrl);
//     } else if (typeof window !== "undefined") {
//       // Retrieve token from localStorage if not found in URL
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     }
//   }, []);

//   if (!token) {
//     return null; // Exit if no token
//   }
// console.log(token)
//   if (router.query.id) {
//     return null;
//   }

//   const handleBack = () => {
//     router.back();
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select a file to upload");
//       return;
//     }

//     if (file.type !== "application/pdf") {
//       toast.error("Please upload a PDF file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("files", file);

//     setLoading(true);
//     setShowLoadingAnimation(true);
//     try {
//       const response = await axios.post("https://api.abroadium.com/api/jobseeker/resume-upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           toast.info(`Upload progress: ${percentCompleted}%`);
//         },
//       });

//       const resumeData = response.data.data[0];
//       if (!resumeData || !resumeData.resume_parse_data) {
//         toast.error("Resume data not found in API response");
//         setLoading(false);
//         setShowLoadingAnimation(false);
//         return;
//       }

//       const parsedData = JSON.parse(resumeData.resume_parse_data);
//       setResumeData(parsedData.templateData);
//       localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
//       localStorage.setItem("resumeId", resumeData.id);
//       localStorage.setItem("location", resumeData.file_path);

//       toast.success("File uploaded successfully");
//       setIsUploaded(true);
//       setLoading(false);
//       setShowLoadingAnimation(false);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("File upload failed");
//       setLoading(false);
//       setShowLoadingAnimation(false);
//     }
//   };

//   const handleStartFromScratch = async () => {
//     setShowLoadingAnimation(true);
//     try {
//       const response = await axios.post(
//         "https://api.abroadium.com/api/jobseeker/resume-create",
//         {},
//         { headers: { Authorization: token } }
//       );

//       if (response.data && response.data.data) {
//         const { id, file_path, ai_resume_parse_data } = response.data.data;

//         const parsedData = JSON.parse(ai_resume_parse_data).templateData;

//         setResumeData(parsedData);
//         localStorage.setItem("resumeData", JSON.stringify(parsedData));
//         localStorage.setItem("resumeId", id);
//         localStorage.setItem("location", file_path);

//         router.push(`/dashboard/aibuilder/${id}`);
//         setShowLoadingAnimation(false);
//         toast.success("Started from scratch successfully!");
//       } else {
//         throw new Error("Invalid response data format");
//       }
//     } catch (error) {
//       console.error("Error creating resume from scratch:", error);
//       toast.error("Failed to start from scratch");
//       setShowLoadingAnimation(false);
//     }
//   };

//   return (
//     <>
//       {showLoadingAnimation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
//           <div className="loader"></div>
//           <div className="ms-5 text-white text-center text-lg md:text-2xl">
//             ☑ Resume information reading <br />☑ Analyzing and improving resume
//             content as per industry standards
//           </div>
//         </div>
//       )}

//       {showOverlay && !isUploaded && !showLoadingAnimation && (
//         <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-75 ">
//           <div className="bg-white   rounded-lg shadow-lg h-screen w-screen text-center relative">
//             <nav class="border-b-2 bg-gray-300 bg">
//               <div
//                 class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4"
//                 style={{ backgroundColor: "#4C3957" }}
//               >
//                 <a
//                   href="#"
//                   class="flex items-center space-x-3 rtl:space-x-reverse"
//                 >
//                   <img
//                     src="https://abroadiumlandingemployee.vercel.app/assets/logo-c5bcd0df.png"
//                     class="h-8"
//                     alt="Flowbite Logo"
//                   />
//                 </a>

//                 <div
//                   class="hidden w-full md:block md:w-auto"
//                   id="navbar-solid-bg"
//                 ></div>
//               </div>
//             </nav>

//             <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 md:mt-16">
//               Are you uploading an existing resume?
//             </h1>
//             <p className="text-gray-600 mb-5">
//               Just review, edit, and update it with new information
//             </p>

//             <div className="flex flex-col md:flex-row items-center justify-center gap-5 ml-[10%] mr-[10%]">
//               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
//                 <div className="mb-4">
//                   <svg
//                     className="mx-auto h-8 w-8 md:h-12 md:w-12 text-slate-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-lg font-semibold mb-2">
//                   Yes, upload from my resume
//                 </h2>
//                 <p className="text-gray-500 mb-5 text-sm md:text-base">
//                   We will give you expert guidance to fill out your info and
//                   enhance your resume, from start to finish
//                 </p>

//                 <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-yellow-500 transition">
//                   <FaCloudUploadAlt className="inline-block mr-2" />
//                   <span>Select Resume (PDF)</span>
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept=".pdf"
//                   />
//                 </label>

//                 <button
//                   className={`p-2 mt-4 w-full text-white bg-gray-700 rounded ${
//                     loading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-gray-600 transition"
//                   }`}
//                   onClick={handleUpload}
//                   disabled={loading}
//                 >
//                   {loading ? "Uploading..." : "Upload"}
//                 </button>
//               </div>

//               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
//                 <div className="mb-4">
//                   <svg
//                     className="mx-auto h-8 w-8 md:h-12 md:w-12 text-yellow-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-lg font-semibold mb-2">
//                   No, start from scratch
//                 </h2>
//                 <p className="text-gray-500 text-sm md:text-base">
//                   We will guide you through the whole process so your skills can
//                   shine
//                 </p>
//                 <button
//                   className="p-2 w-full mt-8 md:mt-20 text-white bg-yellow-500 rounded hover:bg-yellow-400 transition"
//                   onClick={handleStartFromScratch}
//                 >
//                   Start From Scratch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoadUnload;

import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ResumeContext } from "../context/ResumeContext";

// Resume Enhancement Modal Component
const ResumeEnhancementModal = ({ isOpen, onClose, fileLocation, token }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { setResumeData } = useContext(ResumeContext);

  const handleResumeEnhancement = async () => {
    if (!fileLocation || !token) {
      toast.error("Unable to enhance resume. Missing information.");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-improved",
        {
          keyword: "resume improved",
          file_location: fileLocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      // Handle successful enhancement
      if (response.data && response.data.data) {
        console.log(response.data.data, "ehnceh dtat");
        const enhancedResumeData = JSON.parse(
          response.data.data.resume_parse_data
        );

        // Update resume data in context and local storage
        setResumeData(enhancedResumeData.templateData);
        // localStorage.setItem('resumeData', JSON.stringify(enhancedResumeData.templateData));

        toast.success("Resume enhanced successfully!");
        onClose();
      } else {
        toast.error("Failed to enhance resume");
      }
    } catch (error) {
      console.error("Resume enhancement error:", error);
      toast.error("Failed to enhance resume");
    } finally {
      setIsEnhancing(false);
    }
  };

  if (!isOpen) return null;

  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  //       <div className="bg-white rounded-lg shadow-xl p-6 w-7xl max-w-7xl">
  //         <h2 className="text-xl font-bold mb-4 text-center">Enhance Your Resume</h2>
  //         <p className="text-gray-600 mb-6 text-center">
  //         Enhanced Checklist
  // Professional Formatting: Aligns text, headings, and spacing for a polished and professional appearance.
  // Spelling and Grammar Corrections: Detects and fixes errors for clarity and professionalism.
  // Duplicate Word Removal: Eliminates repeated or redundant phrases.
  // Industry Expert Suggestions: Integrates tailored recommendations to match industry expectations.
  // ATS (Applicant Tracking System) Optimization: Ensures keywords and structure are ATS-friendly to increase job application visibility.
  // Role-Specific Enhancements: Customizes the resume to highlight relevant skills and achievements for specific job roles.
  // Keyword Optimization: Incorporates relevant keywords to improve discoverability by recruiters and AI filters.
  // Action-Oriented Language: Replaces passive descriptions with active, impactful verbs to make achievements stand out.
  // Consistency Checks: Ensures uniformity in fonts, bullet points, dates, and other elements for a cohesive look.
  // Achievement Highlighting: Emphasizes measurable accomplishments to showcase your value to potential employers.
  // Section Prioritization: Reorganizes sections like experience, skills, and education to highlight the most critical information first.
  // Soft Skills Optimization: Highlights relevant soft skills tailored to job descriptions.
  // Professional Tone Adjustment: Refines language for a professional yet approachable tone.
  // Customization for Target Roles: Adjusts content to match the expectations of specific industries or job postings.
  // LinkedIn Alignment: Suggests changes to sync your resume content with your LinkedIn profile for consistency.
  // Cover Letter Insights: Provides tips or integration options for creating a matching, impactful cover letter.
  // Visual Enhancements: Suggests visually appealing designs and layouts for readability and impact.
  // Error Highlighting: Shows specific areas of improvement for further customization by the user.
  //         </p>

  //         <div className="flex justify-center space-x-4">
  //           <button
  //             onClick={handleResumeEnhancement}
  //             disabled={isEnhancing}
  //             className={`px-4 py-2 rounded ${
  //               isEnhancing
  //               ? 'bg-gray-400 cursor-not-allowed'
  //               : 'bg-green-500 hover:bg-green-600 text-white'
  //             }`}
  //           >
  //             {isEnhancing ? 'Enhancing...' : 'Yes, Enhance'}
  //           </button>

  //           <button
  //             onClick={onClose}
  //             disabled={isEnhancing}
  //             className={`px-4 py-2 rounded ${
  //               isEnhancing
  //               ? 'text-gray-400 cursor-not-allowed'
  //               : 'bg-gray-200 hover:bg-gray-300'
  //             }`}
  //           >
  //             No, Thanks
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  const enhancementFeatures = [
    "Professional Formatting: Aligns text, headings, and spacing for a polished and professional appearance.",
    "Spelling and Grammar Corrections: Detects and fixes errors for clarity and professionalism.",
    "Duplicate Word Removal: Eliminates repeated or redundant phrases.",
    "Industry Expert Suggestions: Integrates tailored recommendations to match industry expectations.",
    "ATS (Applicant Tracking System) Optimization: Ensures keywords and structure are ATS-friendly to increase job application visibility.",
    "Role-Specific Enhancements: Customizes the resume to highlight relevant skills and achievements for specific job roles.",
    "Keyword Optimization: Incorporates relevant keywords to improve discoverability by recruiters and AI filters.",
    "Action-Oriented Language: Replaces passive descriptions with active, impactful verbs to make achievements stand out.",
    "Consistency Checks: Ensures uniformity in fonts, bullet points, dates, and other elements for a cohesive look.",
    "Achievement Highlighting: Emphasizes measurable accomplishments to showcase your value to potential employers.",
    "Section Prioritization: Reorganizes sections like experience, skills, and education to highlight the most critical information first.",
    "Soft Skills Optimization: Highlights relevant soft skills tailored to job descriptions.",
    "Professional Tone Adjustment: Refines language for a professional yet approachable tone.",
    "Customization for Target Roles: Adjusts content to match the expectations of specific industries or job postings.",
    "LinkedIn Alignment: Suggests changes to sync your resume content with your LinkedIn profile for consistency.",
    "Cover Letter Insights: Provides tips or integration options for creating a matching, impactful cover letter.",
    "Visual Enhancements: Suggests visually appealing designs and layouts for readability and impact.",
    "Error Highlighting: Shows specific areas of improvement for further customization by the user.",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-center text-white">
            Enhance Your Resume
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-500', label: 'Professional Formatting' },
            { icon: 'M10 20l4-16m4 4l4 4-4 4', color: 'text-blue-500', label: 'ATS Optimization' },
            { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'text-purple-500', label: 'Smart Editing' }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-12 w-12 ${feature.color} mb-2`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={feature.icon} 
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">{feature.label}</span>
            </div>
          ))}
        </div> */}

          {/* Detailed Feature List */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-80 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Comprehensive Resume Enhancement Features
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {enhancementFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 flex-shrink-0 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleResumeEnhancement}
              disabled={isEnhancing}
              className={`
              px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 
              ${
                isEnhancing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              }
            `}
            >
              {isEnhancing ? "Enhancing..." : "Yes, Enhance"}
            </button>
            <button
              onClick={onClose}
              disabled={isEnhancing}
              className={`
              px-6 py-2 rounded-lg font-semibold transition-all duration-300
              ${
                isEnhancing
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            >
              No, Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main LoadUnload Component
const LoadUnload = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [token, setToken] = useState(null);
  const [fileLocation, setFileLocation] = useState(null);
  const [showEnhancementModal, setShowEnhancementModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Token extraction logic
    const url = window.location.href;
    const tokenFromUrl = url.split("/?")[1];

    if (tokenFromUrl) {
      // localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
    } else if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return null;
  }

  if (router.query.id) {
    return null;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    setLoading(true);
    setShowLoadingAnimation(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            toast.info(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      const resumeData = response.data.data[0];
      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setLoading(false);
        setShowLoadingAnimation(false);
        return;
      }

      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);
      // localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
      // localStorage.setItem("resumeId", resumeData.id);
      // localStorage.setItem("location", resumeData.file_path);

      // Store file location for enhancement
      setFileLocation(resumeData.file_path);

      toast.success("File uploaded successfully");
      setIsUploaded(true);
      setLoading(false);
      setShowLoadingAnimation(false);

      // Show enhancement modal after successful upload
      setShowEnhancementModal(true);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
      setShowLoadingAnimation(false);
    }
  };

  const handleStartFromScratch = async () => {
    setShowLoadingAnimation(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-create",
        {},
        { headers: { Authorization: token } }
      );

      if (response.data && response.data.data) {
        const { id, file_path, ai_resume_parse_data } = response.data.data;

        const parsedData = JSON.parse(ai_resume_parse_data).templateData;

        setResumeData(parsedData);
        // localStorage.setItem("resumeData", JSON.stringify(parsedData));
        // localStorage.setItem("resumeId", id);
        // localStorage.setItem("location", file_path);

        router.push(`/dashboard/aibuilder/${id}`);
        setShowLoadingAnimation(false);
        toast.success("Started from scratch successfully!");
      } else {
        throw new Error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error creating resume from scratch:", error);
      toast.error("Failed to start from scratch");
      setShowLoadingAnimation(false);
    }
  };

  return (
    <>
      {showLoadingAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="loader"></div>
          <div className="ms-5 text-white text-center text-lg md:text-2xl">
            ☑ Resume information reading <br />☑ Analyzing and improving resume
            content as per industry standards
          </div>
        </div>
      )}

      {showOverlay && !isUploaded && !showLoadingAnimation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-75 ">
          <div className="bg-white rounded-lg shadow-lg h-screen w-screen text-center relative">
            <nav className="border-b-2 bg-gray-300 bg">
              <div
                className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4"
                style={{ backgroundColor: "#4C3957" }}
              >
                <a
                  href="#"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <img
                    src="https://abroadiumlandingemployee.vercel.app/assets/logo-c5bcd0df.png"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                </a>

                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-solid-bg"
                ></div>
              </div>
            </nav>

            <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 md:mt-16">
              Are you uploading an existing resume?
            </h1>
            <p className="text-gray-600 mb-5">
              Just review, edit, and update it with new information
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 ml-[10%] mr-[10%]">
              <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-8 w-8 md:h-12 md:w-12 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Yes, upload from my resume
                </h2>
                <p className="text-gray-500 mb-5 text-sm md:text-base">
                  We will give you expert guidance to fill out your info and
                  enhance your resume, from start to finish
                </p>

                <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-yellow-500 transition">
                  <FaCloudUploadAlt className="inline-block mr-2" />
                  <span>Select Resume (PDF)</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </label>

                <button
                  className={`p-2 mt-4 w-full text-white bg-gray-700 rounded ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-600 transition"
                  }`}
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>

              <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-8 w-8 md:h-12 md:w-12 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  No, start from scratch
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  We will guide you through the whole process so your skills can
                  shine
                </p>
                <button
                  className="p-2 w-full mt-8 md:mt-20 text-white bg-yellow-500 rounded hover:bg-yellow-400 transition"
                  onClick={handleStartFromScratch}
                >
                  Start From Scratch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Enhancement Modal */}
      <ResumeEnhancementModal
        isOpen={showEnhancementModal}
        onClose={() => setShowEnhancementModal(false)}
        fileLocation={fileLocation}
        token={token}
      />
    </>
  );
};

export default LoadUnload;
