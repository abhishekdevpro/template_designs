"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";

const ExperienceStep = ({ onBack, onNext, onChange, value }) => {
  const router = useRouter();
  const { resumeData, setResumeData, exp, setExp } = useContext(ResumeContext);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const experiences = [
    { id: "fresher", label: "No Experience" },
    { id: "Less Than 3 Years", label: "Less Than 3 Years" },
    { id: "3-5 Years", label: "3-5 Years" },
    { id: "5-10 Years", label: "5-10 Years" },
    { id: "10+ Years", label: "10+ Years" },
  ];

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = response.data.data.ai_resume_parse_data;
          setResumeData(parsedAIData.templateData);

          // Set initial experience value if it exists
          if (parsedAIData.templateData.no_of_experience) {
            const experienceValue = parsedAIData.templateData.no_of_experience;
            onChange({
              ...value,
              experience: experienceValue,
            });
            // Also set it in the context
            setExp(experienceValue);
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatResumeData = (data) => {
    // Add the no_of_experience field directly to the data object
    return {
      ...data,
      no_of_experience: value.experience,
    };
  };

  const handleSaveExperience = async () => {
    if (!resumeData) return;

    if (!value.experience) {
      toast.error("Please select an experience level before proceeding");
      return;
    }

    // Update exp in context
    setExp(value.experience);

    const templateData = {
      templateData: formatResumeData(resumeData),
    };

    setIsLoading(true);

    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");
      // if (!resumeId) {
      //   toast.error("Resume ID not found");
      //   return;
      // }

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/resume-update/${resumeId}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        toast.success(response.data.message || "Experience saved Successfully");
        onNext();
      } else {
        toast.error(response.data.error || "Error while saving the experience");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if Next button should be disabled
  const isNextButtonDisabled = () => {
    return loading || value.experience === "2" || isLoading;
  };
  console.log(value.experience, "value.experience");
  // return (
  //   <div className="min-h-screen bg-gray-50 py-12">
  //     <div className="max-w-4xl mx-auto px-4">
  //       <div className="text-center mb-12">
  //         <h2 className="text-4xl font-bold text-gray-900 mb-4">
  //           Tell Us About Your Experience
  //         </h2>
  //         <p className="text-xl text-gray-600">
  //           We will customize your resume based on your experience level
  //         </p>
  //       </div>

  //       <div className="bg-white rounded-xl shadow-lg p-8">
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h3 className="text-2xl font-bold text-gray-900">
  //               How long have you been working?
  //             </h3>
  //             <p className="mt-2 text-gray-600">
  //               We will find the best templates for your experience level.
  //             </p>
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //             {experiences.map((experience) => (
  //               <button
  //                 key={experience.id}
  //                 onClick={() => {
  //                   onChange({ ...value, experience: experience.id });
  //                   // Also update the exp in context when a button is clicked
  //                   setExp(experience.id);
  //                 }}
  //                 className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
  //                   value.experience === experience.id
  //                     ? "border-blue-600 bg-blue-50"
  //                     : "border-gray-200 hover:border-blue-400"
  //                 }`}
  //               >
  //                 <span className="block text-lg font-medium">
  //                   {experience.label}
  //                 </span>
  //               </button>
  //             ))}
  //           </div>

  //           {/* Added warning message for when no experience is selected */}
  //           {!value.experience && (
  //             <p className="text-center text-red-500 mt-4">
  //               Please select an experience level to continue
  //             </p>
  //           )}
  //         </div>
  //       </div>

  //       <div className="flex justify-end mt-12">
  //         {/* <button
  //           onClick={onBack}
  //           className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700
  //             font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
  //         >
  //           Back
  //         </button> */}
  //         <button
  //           onClick={handleSaveExperience}
  //           disabled={isNextButtonDisabled()}
  //           className={`px-8 py-3 rounded-xl font-medium transition-all shadow-lg
  //             ${
  //               isNextButtonDisabled()
  //                 ? "bg-gray-400 opacity-70 cursor-not-allowed"
  //                 : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl"
  //             }`}
  //         >
  //           {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How Many Years of Experience Do You Have?
          </h1>
          <p className="text-md md:text-lg text-primary mb-10">
            Select the option that corresponds to your professional experience
            level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
          {[
            { id: "fresher", label: "Less than 1 year" },
            { id: "1-3", label: "1 – 3 years" },
            { id: "4-9", label: "4 – 9 years" },
            { id: "10+", label: "10+ years" },
          ].map((exp) => (
            <button
              key={exp.id}
              onClick={() => onChange({ ...value, experience: exp.id })}
              className={`w-full p-5 rounded-2xl shadow-md bg-blue-200 
    hover:bg-primary hover:text-white hover:shadow-xl 
    flex items-center justify-between text-primary font-semibold
    transition-all duration-300 ease-in-out transform hover:scale-105 group
    ${
      value.experience === exp.id
        ? "bg-primary text-primary border-2 border-primary shadow-xl scale-105 text-white"
        : ""
    }`}
            >
              <span className="text-lg mb-2">{exp.label}</span>
              <span className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                →
              </span>
            </button>
          ))}
        </div>

        {!value.experience && (
          <p className="text-red-500 text-sm mt-4">
            Please select an experience level to continue
          </p>
        )}

        <div className="mt-10 flex justify-center gap-4 ">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSaveExperience}
            disabled={isNextButtonDisabled()}
            className={`px-8 py-3 rounded-lg font-medium transition-all shadow-md 
              ${
                isNextButtonDisabled()
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
          >
            {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ExperienceStep;
