import { useEffect, useState } from "react";
import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
import InterviewSection from "../../components/dashboard/InterviewSection";
import ResumeStrength from "../../components/dashboard/ResumeStrength";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import MyResume from "./MyResume";
import MyJobs from "./MyJobs";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import AbroadiumCommunity from "../../components/dashboard/AbroadiumCommunity";
import { Download, Edit, Trash, Plus, User } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../components/buttonUIComponent";
export default function DashboardPage() {
  const [strength, setStrength] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       axios
  //         .get("https://api.abroadium.com/api/jobseeker/resume-list", {
  //           headers: { Authorization: token },
  //         })
  //         .then((response) => {
  //           const resumes = response?.data?.data || [];
  //           if (resumes.length === 0) {
  //             toast.info("No resumes available.");
  //           }
  //           setResumes(resumes);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching resume list:", error);
  //           toast.error("Failed to fetch resumes.");

  //         });
  //     }
  //   }, []);
  // console.log(resumes.length,"Length");
  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/resume-list/0?resume_default=true`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data?.code === 200 || response.data?.status === "success") {
        setStrength(response.data.data?.resume_strenght_details || null);
        setResumeId(response.data.data?.resume_id || null);
      } else {
        setStrength(null);
        setResumeId(null);
      }
    } catch (err) {
      setError(err.message);
      setStrength(null);
      setResumeId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if(resumes.length==0)
    resumeStrength();

    // const interval = setInterval(resumeStrength, 300000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  // if (loading) {
  //   return <FullScreenLoader />;
  // }

  const handleCreateCoverLetter = () => {
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };
  const handleCreateResume = () => {
    setTimeout(() => {
      router.push("/dashboard/resume-builder");
    }, 2000);
  };
  const handleMyDashboard = () => {
    setTimeout(() => {
      router.push("https://airesume.abroadium.com/dashboard");
    }, 2000);
  };
  return (
    <>
      <div className="bg-gradient-to-b from-white to-blue-100 ">
        <Navbar />
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
          {/* Sidebar */}
          <Sidebar
            score={strength?.resume_strenght || 0}
            resumeId={resumeId || null}
            // resumes={resumes}
          />

          {/* Main Content */}
          <main className="flex-1 p-2 md:p-6 overflow-y-auto">
            <div className="flex flex-col gap-2 w-full md:flex-row  justify-between items-center mb-8">
              <Button
                variant="success"
                onClick={handleCreateResume}
                className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-success/90 transition-colors duration-200 font-medium shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" /> Create New Resume
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateCoverLetter}
                className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-primary/90  transition-colors duration-200 font-medium shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
              </Button>
              <Button
                variant="success"
                onClick={handleMyDashboard}
                className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-success/90  transition-colors duration-200 font-medium shadow-sm "
              >
                <User className="w-5 h-5 mr-2" />
                My Profile Dashboard
              </Button>
            </div>
            <h1 className="text-2xl font-bold mb-6">
              Your Recommended Next Steps
            </h1>
            <ResumeStrength
              score={strength?.resume_strenght || 0}
              strength={strength || {}}
              resumeId={resumeId || null}
            />
            {/* <InterviewSection /> */}
            <AbroadiumCommunity />
            <CoverLetterSection />
          </main>
        </div>
        <MyResume />
        <MyJobs />
      </div>
    </>
  );
}
