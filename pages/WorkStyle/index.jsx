import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbarcoverletter from "../../components/cv/coverletter/Navbarcoverletter";
import Link from "next/link";

const WorkStyle = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  // Handle continue after typing job title
  const handleContinueAfterJobTitle = () => {
    if (jobTitle) {
      setTransitioning(true);
      setTimeout(() => {
        setShowOptions(true);
        setTransitioning(false);
      }, 300); // Match this duration with the CSS animation time
    }
  };

  // Handle final continue after selecting an option
  const handleFinalContinue = () => {
    if (selectedBox) {
      router.push("/Finalize"); // Redirect to the next page
    }
  };

  const jobOptions = [
    "Software Engineer",
    "Project Manager",
    "Data Analyst",
    "Marketing Specialist",
    "Product Manager",
    "UX Designer",
  ];

  return (
    <>
      <Navbarcoverletter />

      {!showOptions ? (
        // Show input field initially

        <div>
          <div className="text-center my-16">
            <h3 className="font-semibold text-3xl">
              What’s your most recent job title?
            </h3>
            <p className="text-xl my-3 font-light">
              Include your current employment or last job.
            </p>
          </div>
          <div
            className={`flex justify-center mb-40 ${
              transitioning ? "transition-fade-out" : ""
            }`}
          >
            <div>
              <label htmlFor="JobTitle" className="text-xs font-semibold">
                Job Title
              </label>{" "}
              <br />
              <input
                type="text"
                name="JobTitle"
                className="border-gray-400 border rounded-md w-96 p-3 px-5"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        // Show boxes after user has entered job title and clicked continue

        <div>
          <div className="text-center my-12 ">
            <h3 className="font-semibold text-3xl">
              What’s your working style?
            </h3>
            <p className="text-xl my-3  font-light">
              This helps us personalize the tone of your letter.
            </p>
          </div>
          <div
            className={`grid grid-cols-3  gap-4 px-80 my-8 ${
              transitioning ? "transition-fade-in" : ""
            }`}
          >
            {jobOptions.map((option) => (
              <div
                key={option}
                onClick={() => setSelectedBox(option)}
                className={`  rounded-xl text-center cursor-pointer h-36 border-black font-semibold  text-white border border-t-8  ${
                  selectedBox === option
                    ? "border bg-blue-800 border-blue-800 border-t-8"
                    : "bg-gray-700 border  border-gray-700 border-t-8 "
                }`}
              >
                <p className="font-serif ">{option}</p>
                <p className="font-extralight mt-3 bg-white py-5 text-black ">
                  Random words This helps us personalize the tone of your
                  letter.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex px-60 my-20 justify-between text-center">
        <Link href="/Background">
          <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
            Back
          </button>
        </Link>

        {!showOptions ? (
          // Continue button for job title input
          <button
            className={`rounded-full p-2 px-10 text-lg font-bold text-black ${
              jobTitle ? "bg-yellow-500 cursor-pointer" : "bg-gray-300"
            }`}
            disabled={!jobTitle}
            onClick={handleContinueAfterJobTitle}
          >
            Continue
          </button>
        ) : (
          // Continue button after selecting a job option
          <button
            className={`rounded-full p-2 px-10 text-lg font-bold text-black ${
              selectedBox ? "bg-yellow-500 cursor-pointer" : "bg-gray-300"
            }`}
            disabled={!selectedBox}
            onClick={handleFinalContinue}
          >
            Continue
          </button>
        )}
      </div>
    </>
  );
};

export default WorkStyle;
