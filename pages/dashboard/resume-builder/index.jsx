// "use client";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import Navbar from "../../Navbar/Navbar";
// import { SaveLoader } from "../../../components/ResumeLoader/SaveLoader";
// import Button from "../../../components/buttonUIComponent";

// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleCreateResume = async () => {
//     // Prevent multiple clicks
//     if (loading) return;

//     setLoading(true);
//     setError("");

//     try {
//       // Replace this with your actual token
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://api.abroadium.com/api/jobseeker/resume-create",
//         {},
//         {
//           headers: {
//             Authorization: ` ${token}`,
//           },
//         }
//       );

//       // Assuming the response contains the ID
//       console.log(response);
//       const { id } = response.data.data;

//       // Only navigate after successful API response
//       router.push(`/dashboard/resume-builder/${id}`);
//     } catch (err) {
//       console.error("Error creating resume:", err);
//       setError("Failed to create resume. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-gradient-to-b from-white to-blue-100  flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center border-red-900">
//           <h1 className="text-2xl font-bold mb-4 text-primary hover:text-success/90">Welcome to Resume Builder</h1>
//           <p className="mb-6 text-primary hover:text-success/90">
//             Click the Button below to create your resume.
//           </p>
//           {error && <p className="text-primary mb-4">{error}</p>}
//           <Button
//             onClick={handleCreateResume}
//             className={`px-6 py-3 text-white font-semibold rounded-lg ${
//               loading ? "bg-gray-400" : "bg-orange-500 hover:bg-primary"
//             }`}
//             disabled={loading}
//           >
//             {loading ? (
//               <SaveLoader loadingText="Creating" />
//             ) : (
//               "Create Your Resume"
//             )}
//           </Button>
//         </div>
//       </main>
//     </>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import { SaveLoader } from "../../../components/ResumeLoader/SaveLoader";
import Button from "../../../components/buttonUIComponent";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateResume = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-create",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      const { id } = response.data.data;
      router.push(`/dashboard/resume-builder/${id}`);
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
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
            Welcome to Resume Builder
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mb-6">
            Click the button below to begin creating your professional resume.
          </p>

          {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleCreateResume}
              className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-full transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-success hover:bg-primary"
              }`}
              disabled={loading}
            >
              {loading ? (
                <SaveLoader loadingText="Creating" />
              ) : (
                "Create Your Resume"
              )}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
