// // import React, { useState } from 'react';
// // import { useRouter } from 'next/router'; // Import the useRouter hook

// // const UploadResume = () => {
// //   const [selectedCard, setSelectedCard] = useState(null);
// //   const router = useRouter(); // Initialize the router

// //   const handleCardSelect = (card) => {
// //     setSelectedCard(card);
// //   };

// //   const handleNext = () => {
// //     if (selectedCard) {
// //       // Navigate based on the selected card
// //       if (selectedCard === 'upload') {
// //         router.push('/UploadResume'); // Redirect to the UploadResume page
// //       } else if (selectedCard === 'start') {
// //         router.push('/builder'); // Redirect to the index page
// //       }
// //     } else {
// //       alert('Please select a card before proceeding.');
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center  bg-gray-100">
// //       <h1 className="text-2xl font-bold mb-4 mt-32">Are you uploading an existing resume?</h1>
// //       <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>
// //       <div className="flex space-x-4 my-10">
// //         <div
// //           className={`border ${selectedCard === 'upload' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center w- shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
// //           onClick={() => handleCardSelect('upload')}
// //         >
// //           <div className="mb-4">
// //             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
// //             </svg>
// //           </div>
// //           <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
// //           <p className="text-gray-500">We’ll give you expert guidance to fill out your info and enhance your resume,<br/> from start to finish</p>
// //         </div>

// //         <div
// //           className={`border ${selectedCard === 'start' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center  shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
// //           onClick={() => handleCardSelect('start')}
// //         >
// //           <div className="mb-4">
// //             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //             </svg>
// //           </div>
// //           <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
// //           <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
// //         </div>
// //       </div>
// //       <div className="flex justify-between my-8 w-full px-40 mb-28">
// //         <button className="px-16 py-1 border-2 bg-white text-lg border-blue-800 text-blue-700 rounded-3xl hover:bg-gray-300">Back</button>
// //         <button className="px-16 py-2 bg-yellow-400 text-lg rounded-3xl hover:bg-yellow-500" onClick={handleNext}>Next</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UploadResume;

// import React, { useState } from 'react';
// import { useRouter } from 'next/router'; // Import the useRouter hook

// const UploadResume = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const router = useRouter(); // Initialize the router

//   const handleCardSelect = (card) => {
//     setSelectedCard(card);
//   };

//   const handleNext = () => {
//     if (selectedCard) {
//       // Navigate based on the selected card
//       if (selectedCard === 'upload') {
//         router.push('/UploadResume'); // Redirect to the UploadResume page
//       } else if (selectedCard === 'start') {
//         router.push('/builder'); // Redirect to the index page
//       }
//     } else {
//       alert('Please select a card before proceeding.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center  bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4 mt-32">Are you uploading an existing resume?</h1>
//       <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>
//       <div className="flex space-x-4 my-10">
//         <div
//           className={`border ${selectedCard === 'upload' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center w- shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
//           onClick={() => handleCardSelect('upload')}
//         >
//           <div className="mb-4">
//             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
//             </svg>
//           </div>
//           <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
//           <p className="text-gray-500">We’ll give you expert guidance to fill out your info and enhance your resume,<br/> from start to finish</p>
//         </div>

//         <div
//           className={`border ${selectedCard === 'start' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center  shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
//           onClick={() => handleCardSelect('start')}
//         >
//           <div className="mb-4">
//             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//           </div>
//           <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
//           <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
//         </div>
//       </div>
//       <div className=" my-8 w-full px-40 mb-28">

//         <button className="px-16 py-2 bg-yellow-400 text-lg rounded-3xl hover:bg-yellow-500 float-end" onClick={handleNext}>Next</button>
//       </div>

//     </div>
//   );
// };

// export default UploadResume;

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
const UploadResume = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/builder"); // Redirect to the index page
  };
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
         
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
           {" "}
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to our AI Resume Builder!
        </h1>
           {" "}
        <p className="text-lg text-gray-600">
          Discover the Power of AI Resume Builder
        </p>
           {" "}
        <button
          className="bg-orange-500 hover:bg-primary/90 mt-5 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
                Get Started    {" "}
        </button>
           
      </div>
       {" "}
    </div>
  );
};

export default UploadResume;
