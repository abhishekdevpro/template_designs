import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbarcoverletter = () => {
  const router = useRouter();

  // Function to determine if a link is active
  const isActive = (path) => router.pathname === path;

  return (
    <nav className="bg-gray-800 p-4 pe-40" >
      <div className="flex justify-end  ">
        {/* Step 1 */}
        
        <Link href="/Createletterpage" className="relative flex flex-col items-center">
          {/* Number box */}
          
          <div
            className={`w-7 h-7 flex justify-center items-center  text-sm rounded-full border-2 disabled ${
              isActive("/Createletterpage") ? "text-black bg-white text-sm font-bold " : "border-white text-white text-sm font-bold"
            }`}
          >
            1 
          </div>
        </Link>

        {/* Line connecting numbers */}
        <div className="h-0.5 w-28 bg-white mt-3"></div>

        {/* Step 2 */}
        <Link href="/Background" className="relative flex flex-col items-center">
          <div
            className={`w-7 h-7 flex justify-center items-center  text-sm rounded-full border-2 ${
                isActive("/Background") ?  "text-black bg-white text-sm font-bold" : "border-white text-white text-sm font-bold"
            }`}
          >
            2
            </div>
        </Link>

        <div className="h-0.5 w-28 bg-white mt-3"></div>

        {/* Step 3 */}
        <Link href="/WorkStyle" className="relative flex flex-col items-center">
          <div
            className={`w-7 h-7 flex justify-center items-center  text-sm rounded-full border-2 ${
                isActive("/WorkStyle") ?  "text-black bg-white text-sm font-bold" : "border-white text-white text-sm font-bold"
            }`}
          >
            3
            </div>
        </Link>

  {/* Line connecting numbers */}
  <div className="h-0.5 w-28 bg-white mt-3"></div>

         {/* Step 4 */}
         <Link href="Finalize" className="relative flex flex-col items-center">
          <div
            className={`w-7 h-7 flex justify-center items-center  text-sm rounded-full border-2 ${
                isActive("/Finalize") ?  "text-black bg-white text-sm font-bold" : "border-white text-white text-sm font-bold"
            }`}
          >
            4
            </div>
        </Link>
      </div>
      <div className="flex justify-end  ">
        {/* Step 1 */}
        
        <p className="text-white text-xs mt-1">Target Job</p>

        {/* Line connecting numbers */}
        <div className="h-1 w-20  mt-3"></div>

        {/* Step 2 */}
        <p className="text-white text-xs mt-1">Background</p>

        <div className="h-1 w-20 "></div>

        {/* Step 3 */}
        <p className="text-white text-xs mt-1">Work style</p>

  {/* Line connecting numbers */}
  <div className="h-1 w-20"></div>

         {/* Step 4 */}
         <p className="text-white text-xs mt-1">Finalize</p>
      </div>
      
    </nav>
  );
};

export default Navbarcoverletter;
