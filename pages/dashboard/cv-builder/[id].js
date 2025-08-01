"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "../../../components/resume-builder-steps/Progress-Bar";

import { ResumeProvider } from "../../../components/context/ResumeContext";
import ExperienceStep from "../../../components/cv/cv-builder-steps/Experience";
import CVSelector from "../../../components/cv/cv-builder-steps/CV-Selector";
import UploadStep from "../../../components/cv/cv-builder-steps/Upload-step";
import FileUploadStep from "../../../components/cv/cv-builder-steps/File-upload";
import CountrySelection from "../../../components/cv/cv-builder-steps/CountrySelection";

export default function Home() {
  const router = useRouter();
  const { id } = router.query; // Retrieve the dynamic ID

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    template: "",
    hasPhoto: false,
    columns: 1,
    uploadType: "",
    file: null,
    country: "",
  });

  const totalSteps = 4;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Example: Display the dynamic ID */}
        {/* <h1 className="text-2xl font-bold mb-4">Resume Builder for ID: {id}</h1> */}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          {currentStep === 1 && (
            <CountrySelection
              onSelectCountry={(country) => {
                updateFormData({ country });
                handleNext();
              }}
              onBack={() => router.back()} // optional: go back to previous page
            />
          )}
          {currentStep === 2 && (
            <ExperienceStep
              onNext={handleNext}
              onChange={(experience) => updateFormData({ experience })}
              value={formData.experience}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <CVSelector
              onNext={handleNext}
              onBack={handleBack}
              onChange={(data) => updateFormData(data)}
              value={{
                template: formData.template,
                hasPhoto: formData.hasPhoto,
                columns: formData.columns,
              }}
            />
          )}

          {currentStep === 4 && (
            <UploadStep
              onNext={handleNext}
              onBack={handleBack}
              onChange={(uploadType) => updateFormData({ uploadType })}
              value={formData.uploadType}
            />
          )}

          {currentStep === 5 && formData.uploadType === "upload" && (
            <FileUploadStep
              onNext={handleNext}
              onBack={handleBack}
              onChange={(file) => updateFormData({ file })}
              value={formData.file}
            />
          )}
        </div>
      </div>
    </main>
  );
}
