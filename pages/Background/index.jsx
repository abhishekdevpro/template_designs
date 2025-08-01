import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbarcoverletter from "../../components/cv/coverletter/Navbarcoverletter";
import Link from "next/link";

const Background = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const router = useRouter();

  // Array of available skills
  const skills = [
    "Leadership",
    "Teamwork",
    "Communication",
    "Problem Solving",
    "Adaptability",
    "Creativity",
    "Time Management",
    "Work Ethic",
    "Critical Thinking",
    "Attention to Detail",
    "Collaboration",
    "Technical Skills",
  ];

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill)); // Deselect if already selected
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]); // Select skill if less than 3 are selected
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedSkills.length === 3) {
      router.push("WorkStyle"); // Redirect to the next page
    }
  };

  return (
    <>
      <Navbarcoverletter />

      <div className="text-center my-16 ">
        <h3 className="font-semibold text-3xl">Choose your top 3 strengths.</h3>
        <p className="text-xl my-3 font-light">
          We’ll highlight these in your cover letter to help match your
          strengths to the desired position.
        </p>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="my-8">
          <div className="flex justify-center space-x-4">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="p-4 border rounded-lg text-center bg-gray-800 text-white cursor-pointer "
                onClick={() => handleSkillSelect(skill)}
              >
                {skill} ✓
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Skills */}
      <div className="grid grid-cols-4 gap-4 px-20 my-8 mx-40">
        {skills
          .filter((skill) => !selectedSkills.includes(skill)) // Hide selected skills from the available list
          .map((skill) => (
            <div
              key={skill}
              onClick={() => handleSkillSelect(skill)}
              className={`p-3 border rounded-lg border-gray-400 text-gray-800 text-center cursor-pointer hover:bg-blue-900 hover:text-white ${
                selectedSkills.length >= 3
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {skill} +
            </div>
          ))}
      </div>

      <div className="flex px-60 my-20 justify-between text-center">
        <Link href="/Createletterpage">
          <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
            Back
          </button>
        </Link>

        <button
          className={`rounded-full p-2 px-10 text-lg font-bold text-black ${
            selectedSkills.length === 3
              ? "bg-yellow-500 cursor-pointer"
              : "bg-gray-300"
          }`}
          disabled={selectedSkills.length !== 3}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Background;
