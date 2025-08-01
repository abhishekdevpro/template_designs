// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import ProgressBar from '../../../components/resume-builder-steps/Progress-Bar'

// import { ResumeProvider } from '../../../components/context/ResumeContext'
// import ExperienceStep from '../../../components/cv-builder-steps/Experience'
// import CVSelector from '../../../components/cv-builder-steps/CV-Selector'
// import UploadStep from '../../../components/cv-builder-steps/Upload-step'
// import FileUploadStep from '../../../components/cv-builder-steps/File-upload'

// export default function Home() {
//   const router = useRouter()
//   const { id } = router.query // Retrieve the dynamic ID

//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     experience: '',
//     template: '',
//     hasPhoto: false,
//     columns: 1,
//     uploadType: '',
//     file: null,
//   })

//   const totalSteps = 4

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
//   }

//   const handleBack = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1))
//   }

//   const updateFormData = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }))
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Example: Display the dynamic ID */}
//         {/* <h1 className="text-2xl font-bold mb-4">Resume Builder for ID: {id}</h1> */}

//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           {currentStep === 1 && (
//             <ExperienceStep
//               onNext={handleNext}
//               onChange={(experience) => updateFormData({ experience })}
//               value={formData.experience}
//             />
//           )}

//           {currentStep === 2 && (
//             <CVSelector
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(data) => updateFormData(data)}
//               value={{
//                 template: formData.template,
//                 hasPhoto: formData.hasPhoto,
//                 columns: formData.columns,
//               }}
//             />
//           )}

//           {currentStep === 3 && (
//             <UploadStep
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(uploadType) => updateFormData({ uploadType })}
//               value={formData.uploadType}
//             />
//           )}

//           {currentStep === 4 && formData.uploadType === 'upload' && (
//             <FileUploadStep
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(file) => updateFormData({ file })}
//               value={formData.file}
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   )
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCvLetter = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace this with your actual token
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/coverletter",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      // Assuming the response contains the ID
      console.log(response);
      const { id } = response.data.data;

      // Navigate to the dynamic route
      router.push(`/dashboard/cv-builder/${id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setError("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Cover Letter Builder
          </h1>
          <p className="mb-6 text-gray-600">
            Click the button below to create your cover letter.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleCreateCvLetter}
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              loading ? "bg-gray-400" : "bg-primary hover:bg-success"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Your Cover Letter"}
          </button>
        </div>
      </main>
    </>
  );
}
