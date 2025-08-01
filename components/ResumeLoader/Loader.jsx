"use client";

import { useEffect } from "react";

const FullScreenLoader = () => {
  useEffect(() => {
    // Inject the animation styles when the component is mounted
    const style = document.createElement("style");
    style.textContent = `
      @keyframes progress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
      }
      
      .animate-progress {
        animation: progress 3s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style when the component is unmounted
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-blue-100 flex items-center justify-center z-50">
      <div className="text-center max-w-md w-full px-4">
        {/* Resume Preview Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto mb-8 relative">
          {/* Blue header bar */}
          <div className="bg-primary h-12 absolute top-0 left-0 right-0 rounded-t-lg"></div>

          {/* Resume Content Preview */}
          <div className="mt-16 space-y-4">
            {/* Animated lines */}
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-progress"></div>
          </div>

          {/* Loading Text */}
          <h2 className="text-xl font-semibold text-gray-800">
            Analyzing Resume...
          </h2>
          <p className="text-gray-600">
            Please wait while we process your document
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;

// 'use client'

// const FullScreenLoader = () => {
//   return (
//     <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//       <div className="text-center max-w-md w-full px-4">
//         {/* Resume Preview Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mx-auto mb-8 relative">
//           {/* Blue header bar */}
//           <div className="bg-blue-500 h-12 absolute top-0 left-0 right-0 rounded-t-lg"></div>

//           {/* Resume Content Preview */}
//           <div className="mt-16 space-y-4">
//             {/* Animated lines */}
//             <div className="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
//             <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
//             <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3"></div>
//             <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
//             <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>

//           </div>
//         </div>

//         {/* Loading Indicator */}
//         <div className="space-y-4">
//           {/* Progress Bar */}
//           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
//           </div>

//           {/* Loading Text */}
//           <h2 className="text-xl font-semibold text-gray-800">Analyzing Resume...</h2>
//           <p className="text-gray-600">Please wait while we process your document</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullScreenLoader;

// const style = {
// style.textContent = `
//   @keyframes progress {
//     0% { width: 0%; }
//     50% { width: 70%; }
//     100% { width: 100%; }
//   }

//   .animate-progress {
//     animation: progress 5s linear;
//   }
// `};
// document.head.appendChild(style);

// import React from 'react';
// import Template1 from '../preview/template/template1.png';
// import Image from 'next/image';

// const FullScreenLoader = () => {
//   return (
//     <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//       <div className="text-center max-w-md w-full px-4">
//         {/* Resume Preview Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mx-auto mb-8 relative">
//           {/* Blue header bar */}
//           <div className="bg-blue-500 h-12 absolute top-0 left-0 right-0 rounded-t-lg"></div>

//           {/* Resume Content Preview */}
//           <div className="mt-16 space-y-4 flex justify-center items-center">
//             <Image
//               src={Template1}
//               alt="Resume Preview"
//               className="w-full max-w-[200px] rounded shadow-md"
//             />
//           </div>
//         </div>

//         {/* Loading Indicator */}
//         <div className="space-y-4">
//           {/* Progress Bar */}
//           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
//           </div>

//           {/* Loading Text */}
//           <h2 className="text-xl font-semibold text-gray-800">Analyzing Resume...</h2>
//           <p className="text-gray-600">Please wait while we process your document</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullScreenLoader;

// // Tailwind CSS keyframes for progress bar
// const style = `
//   @keyframes loader {
//     0% { width: 0%; }
//     50% { width: 75%; }
//     100% { width: 0%; }
//   }
// `;
