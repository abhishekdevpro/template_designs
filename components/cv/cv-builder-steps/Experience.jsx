import { SaveLoader } from "../../ResumeLoader/SaveLoader";
import React, { useState } from "react";
export default function ExperienceStep({ onNext, onBack, onChange, value }) {
  const experiences = [
    { id: "none", label: "No Experience" },
    { id: "less-3", label: "Less Than 3 Years" },
    { id: "3-5", label: "3-5 Years" },
    { id: "5-10", label: "5-10 Years" },
    { id: "10-plus", label: "10+ Years" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  return (
    // <div className="space-y-6">
    //   <div className="text-center">
    //     <h2 className="text-2xl font-bold text-gray-900">
    //       How long have you been working?
    //     </h2>
    //     <p className="mt-2 text-gray-600">
    //       We will find the best templates for your experience level.
    //     </p>
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     {experiences.map((exp) => (
    //       <button
    //         key={exp.id}
    //         onClick={() => {
    //           onChange(exp.id);
    //           onNext();
    //         }}
    //         className={`p-4 rounded-lg border-2 transition-all ${
    //           value === exp.id
    //             ? "border-yellow-600 bg-yellow-50"
    //             : "border-gray-200 hover:border-yellow-400"
    //         }`}
    //       >
    //         {exp.label}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How Many Years of Experience Do You Have?
          </h1>
          <p className="text-md md:text-lg text-[#4b5563] mb-10">
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
              className={`w-full p-6 text-left rounded-xl border-2 flex items-center justify-between text-primary font-semibold transition-all 
                    ${
                      value.experience === exp.id
                        ? "border-primary bg-[#e6f0f5]"
                        : "border-[#e5e7eb] hover:border-primary"
                    }`}
            >
              {exp.label}
              <span className="text-lg">→</span>
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
            onClick={onNext}
            // disabled={isNextButtonDisabled()}
            className={`px-8 py-3 rounded-lg font-medium transition-all shadow-md 
                 
                  `}
          >
            {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}
