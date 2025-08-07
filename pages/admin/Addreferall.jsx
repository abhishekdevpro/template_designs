import React, { useState } from "react"; // test comment
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
function Addreferall() {
  const boxes = [
    <Link href="#" key="box1">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">👥</div>
        <br />
        Referrals By Customers
      </div>
    </Link>,
    <Link href="#" key="box2">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">🤳🏽</div>
        <br />
        Self
      </div>
    </Link>,
    <Link href="#" key="box1">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">📫</div>
        <br />
        Request Service
      </div>
    </Link>,
    <Link href="#" key="box2">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">📑</div>
        <br />
        New Template
      </div>
    </Link>,
    <Link href="#" key="box1">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">📝</div>
        <br />
        New Cover Letter
      </div>
    </Link>,
    <Link href="#" key="box2">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">🛠️</div>
        <br />
        Support
      </div>
    </Link>,
    <Link href="#" key="box2">
      <div className="bg-[#002a48] hover:bg-gray-300 hover:text-black rounded-lg shadow-md pt-16 w-80 h-60 text-center text-white cursor-pointer text-3xl font-semibold">
        <div className="text-5xl">🌍</div>
        <br />
        Other
      </div>
    </Link>,
  ];

  return (
    <div className="p-2 md:p-4 flex flex-wrap justify-center gap-5">
      {boxes.map((box, index) => box)}
    </div>
  );
}

export default Addreferall;
