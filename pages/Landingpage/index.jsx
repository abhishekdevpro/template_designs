import React, { useState } from "react";
import { useRouter } from "next/router";

const Landingpage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === "create") {
      router.push("/Createletterpage"); // Redirect to create letter page
    } else if (selectedOption === "upload") {
      router.push("/upload-resume"); // Redirect to upload resume page
    }
  };

  return (
    <>
      <div className="text-center font-semibold text-3xl my-20">
        How do you want to start your cover letter?
      </div>

      <div className="flex gap-10 justify-center text-center">
        <div
          className={`border h-60 w-1/3 rounded-lg pt-28 text-xl border-blue-700  cursor-pointer ${
            selectedOption === "create" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("create")}
        >
          <strong>Create new letter</strong> <br />
          Walk me through each step
        </div>

        <div
          className={`border h-60 w-1/3 rounded-lg pt-28 text-xl border-blue-700  cursor-pointer ${
            selectedOption === "upload" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("upload")}
        >
          <strong>Upload from resume</strong>
          <br />
          Create my cover letter with info from an existing resume
        </div>
      </div>

      <div className="flex px-60 my-20 justify-between text-center">
        <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
         Back
        </button>

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

export default Landingpage;
