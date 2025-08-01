// const AbroadiumCommunity = () => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-purple-100 rounded-lg">
//             <svg
//               className="w-6 h-6 text-purple-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </svg>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">
//               Join the Abroadium Community!
//             </h3>
//             <p className="text-gray-600 max-w-md">
//               Connect with professionals, industry experts, and like-minded
//               peers in our vibrant discussion space. Share ideas, ask questions,
//               and explore career insights—all while staying anonymous if you
//               prefer. Coming soon to help you grow and thrive!
//             </p>
//           </div>
//         </div>
//         <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
//           I’m In!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AbroadiumCommunity;
import React from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

const AbroadiumCommunity = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg shrink-0">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Join the Abroadium Community!
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md mt-1">
              Connect with professionals, industry experts, and like-minded
              peers in our vibrant discussion space. Share ideas, ask questions,
              and explore career insights—all while staying anonymous if you
              prefer. Coming soon to help you grow and thrive!
            </p>
          </div>
        </div>
        <Link href="https://airesume.abroadium.com/community">
          <button className="px-4 py-2 md:px-6 md:py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 text-sm md:text-base whitespace-nowrap self-start sm:self-center md:self-auto mt-2 sm:mt-0">
            I m In!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AbroadiumCommunity;
