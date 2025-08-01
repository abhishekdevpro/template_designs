import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbarcoverletter from "../../components/cv/coverletter/Navbarcoverletter";
import Link from "next/link";

const Createletterpage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === "create") {
      router.push("/Background"); // Redirect to create letter page
    } else if (selectedOption === "upload") {
      router.push("/Background"); // Redirect to upload resume page
    }
  };

  return (
    <>
      <Navbarcoverletter />
      <div className="text-center my-16">
        <h3 className=" font-semibold text-3xl">
          {" "}
          Do you have a specific job in mind?
        </h3>

        <p className="text-xl my-3 font-light">
          {" "}
          It’s ok if you don’t. We’ll give you a letter you can customize later.
        </p>
      </div>

      <div className="flex gap-10 justify-center text-center mb-60">
        <div
          className={`border p-5 px-20 rounded-2xl border-blue-700 bg-stone-50 cursor-pointer ${
            selectedOption === "create"
              ? "bg-blue-100 border-2 border-blue-800 font-semibold"
              : ""
          }`}
          onClick={() => setSelectedOption("create")}
        >
          Yes
        </div>

        <div
          className={`border p-5 px-20 rounded-2xl border-blue-700 bg-stone-50 cursor-pointer ${
            selectedOption === "upload"
              ? "bg-blue-100 border-2 border-blue-800 font-semibold"
              : ""
          }`}
          onClick={() => setSelectedOption("upload")}
        >
          Not Yet
        </div>
      </div>

      <div className="flex px-60 my-20 justify-between text-center">
        <Link href="/Landingpage">
          <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
            Back
          </button>
        </Link>

        <button
          className={`rounded-full p-2 px-10 text-lg font-bold text-black ${
            selectedOption ? "bg-yellow-500 cursor-pointer" : "bg-gray-300"
          }`}
          disabled={!selectedOption}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Createletterpage;
