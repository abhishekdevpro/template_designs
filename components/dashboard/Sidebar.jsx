import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ResumeContext } from "../../components/context/ResumeContext";
import DashboardPreview from "../preview/DashboardPreview";
import FullScreenLoader from "../ResumeLoader/Loader"; // Assuming you already have this component
import axios from "axios";
import { Download, Edit, Plus } from "lucide-react";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import Button from "../buttonUIComponent";

const Sidebar = ({ score, resumeId }) => {
  // console.log(resumes,"lllll");
  const templateRef = useRef(null);
  const router = useRouter();

  const { resumeData, setResumeData, setHeaderColor, setBgColor } =
    useContext(ResumeContext);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // Loader state
  const [resumeTitle, setResumeTitle] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleEdit = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push({
        pathname: `/dashboard/aibuilder/${resumeId}`,
      });
    }, 2000);
  };

  const handleCreate = () => {
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      setShowLoader(false); // Hide the loader after 5 seconds
      router.push("/dashboard/resume-builder"); // Navigate to the desired route
    }, 5000);
  };

  const fetchResumeData = async () => {
    if (!resumeId) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.status === "success") {
          const { data } = response.data;
          const parsedData = data.ai_resume_parse_data;

          setResumeData(parsedData.templateData);
          setResumeTitle(data.resume_title || "Untitled Resume");
          if (parsedData?.templateData?.templateDetails) {
            const { backgroundColor, templateId } =
              parsedData.templateData.templateDetails;
            setBgColor(backgroundColor || "");
            setHeaderColor(backgroundColor || "");
            setSelectedTemplate(templateId || "template1");
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, [resumeId]);

  const handleDownload = async () => {
    const apiUrl = `https://api.abroadium.com/api/jobseeker/download-resume/${resumeId}`;
    setIsDownloading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again later.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full md:w-[400px] p-4 border-r border-gray-200">
      {showLoader && <FullScreenLoader />} {/* Show the loader */}
      {!showLoader /* Hide other content when loader is visible */ && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{resumeTitle}</h2>
            <Link href="/dashboard/resumelist" className="text-primary ">
              View All
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm p-2 mb-4 relative h-[500px]">
            {loading ? (
              // <div className="flex items-center justify-center h-full">
              //   Loading...
              // </div>
              <div className="flex items-center justify-center h-full">
                <div className="w-10 h-10 border-4 border-gray-300 border-[#002a48] rounded-full animate-spin"></div>
              </div>
            ) : (
              <DashboardPreview
                ref={templateRef}
                selectedTemplate={selectedTemplate}
              />
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleEdit}
              disabled={!resumeId} // Disable Button if resumeId is null
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                !resumeId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Edit />
              Edit
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!resumeId}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                !resumeId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Download />
              {isDownloading ? (
                <SaveLoader loadingText="Downloading" />
              ) : (
                "Download"
              )}
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Resume Strength:</span>
              <div className="flex items-center gap-2">
                <span className="bg-success/20 text-success px-2 py-1 rounded-full text-sm">
                  {score}
                </span>
                {/* <Button className="text-blue-600 hover:text-blue-700 text-sm">
                  Improve
                </Button> */}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:bg-primary/90 text-white rounded-full "
          >
            <Plus />
            Create New Resume
          </Button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
