import React, { useState, useRef, useEffect, useContext } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import dynamic from "next/dynamic";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { ResumeContext } from "../components/context/ResumeContext";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";
import Highlightmenubar from "../components/preview/highlightmenu";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function MobileBuilder() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pdfExportComponent = useRef(null);
  const [isLoading, handleAction] = useLoader();
  const { PayerID } = router.query;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [isDownloading, setisDownloading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const templateRef = useRef(null);
  const {
    setResumeStrength,
    resumeData,
    setResumeData,
    setHeaderColor,
    setBgColor,
    setSelectedFont,
    selectedFont,
    backgroundColorss,
    headerColor,
    exp,
  } = useContext(ResumeContext);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://api.abroadium.com/api/jobseeker/resume-list/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;
            const parsedData = data.ai_resume_parse_data;
            setResumeStrength(data.resume_strenght_details);
            setResumeData(parsedData.templateData);

            if (parsedData.templateData.templateDetails) {
              setBgColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.templateData.templateDetails.backgroundColor
              );
              setSelectedTemplate(
                parsedData.templateData.templateDetails.templateId ||
                  "template1"
              );
              setSelectedFont(
                parsedData.templateData.templateDetails.font || "Ubuntu"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
          toast.error("Failed to fetch resume data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setResumeId(id);
  }, []);

  const sections = [
    { label: "Personal Details", component: <PersonalInformation /> },
    { label: "Social Links", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },

    {
      label: "Skills",
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} currentSkillIndex={index} key={index} />
        ))
      ) : (
        <p>No skills available</p>
      ),
    },
    { label: "Languages", component: <Language /> },
    { label: "Certifications", component: <Certification /> },
  ];

  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const downloadAsBackend = async () => {
    setisDownloading(true);

    if (!templateRef.current) {
      toast.error("Template reference not found");
      setisDownloading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const fullHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,

        {
          html: fullHtml,
          pdf_type: selectedPdfType, // ✅ Move pdf_type here
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);

      const apiError = error.response?.data;
      const statusCode = error.response?.status;

      if (statusCode === 403) {
        setShowUpgradeModal(true); // Show upgrade popup
      } else if (apiError?.error) {
        toast.error(apiError.error);
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setisDownloading(false);
    }
  };

  const downloadAsPDF = () => {
    downloadAsBackend();
    handleFinish();
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/download-file/11/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download the PDF. Please try again.");
    }
  };
  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  }, [PayerID]);

  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("orderid");
      const token = localStorage.getItem("token");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          toast.success("Payment verified successfully!");
          localStorage.removeItem("orderid");
          if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
          }
        } else {
          toast.error("Payment verification failed. Please try again.");
          router.push("/payment-failed");
        }
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
      router.push("/payment-failed");
    }
  };

  const handleFinish = async () => {
    if (!resumeData) return;

    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contact || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia:
          resumeData.socialMedia?.map((media) => ({
            socialMedia: media.socialMedia || "",
            link: media.link || "",
          })) || [],
        summary: resumeData.summary || "",
        education:
          resumeData.education?.map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
            location: edu.location || "",
          })) || [],
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company,
            position: exp.position,
            description: exp.description,
            KeyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements
              : [exp.keyAchievements],
            startYear: exp.startYear,
            endYear: exp.endYear,
            location: exp.location,
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description,
            keyAchievements: Array.isArray(project.keyAchievements)
              ? project.keyAchievements
              : [project.keyAchievements],
            startYear: project.startYear,
            endYear: project.endYear,
            name: project.name || "",
          })) || [],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || [],
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
        no_of_experience: exp,
      },
    };

    await handleAction(async () => {
      try {
        const id = router.query.id || resumeId;
        if (!id) {
          console.error("Resume ID not found.");
          return;
        }

        const url = `https://api.abroadium.com/api/jobseeker/resume-update/${id}`;
        const response = await axios.put(url, templateData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.data.code === 200 || response.data.status === "success") {
          toast.success(response.data.message || "Resume saved Successfully");
        } else {
          toast.error(response.data.error || "Error while saving the Resume");
        }
      } catch (error) {
        toast.error(error?.message || "Error !!");
        console.error("Error updating resume:", error);
      }
    });
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      await handleFinish(); // Ensure handleFinish is an async function
    } finally {
      setLoading(false);
    }
  };
  const MobileNavigation = () => (
    <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 ">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="px-4 py-2 bg-blue-950 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          {sections[currentSection].label}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          {currentSection === sections.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );

  const handleBackToEditor = () => {
    setIsFinished(false);
    setCurrentSection(0);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userProfileResponse = await axios.get(
          "https://api.abroadium.com/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Meta
        title="Abroadium - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />

      <div className="w-full bg-gradient-to-b from-white to-blue-100 ">
        {!isFinished ? (
          <div className="bg-gray-50 flex flex-col">
            <div className="flex flex-col md:flex-row flex-grow ">
              <button
                onClick={toggleMobileSidebar}
                className="fixed z-10 bottom-20 right-4  bg-primary text-white p-3 rounded-full shadow-lg"
              >
                {isMobileSidebarOpen ? (
                  <X className="h-6 w-6 stroke-2" />
                ) : (
                  <Menu className="h-6 w-6 stroke-2" />
                )}
              </button>

              {isMobileSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 "
                  onClick={toggleMobileSidebar}
                />
              )}

              <aside
                className={`fixed md:static left-0 top-0 h-full z-10 transform 
                                ${
                                  isMobileSidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                } 
                                md:translate-x-0 transition-transform duration-300 ease-in-out 
                                w-64 bg-gray-100 border-r`}
              >
                <div className="sticky top-20 p-4 h-full">
                  <div className="mt-12 md:mt-0">
                    <Sidebar />
                  </div>
                </div>
              </aside>
              <div
                className="w-screen flex justify-start min-h-screen "
                style={{ backgroundColor: "#002a48" }}
              >
                <main className="flex-1 h-full w-full mx-auto p-4 pb-10 mb-8 overflow-visible">
                  <form>{sections[currentSection].component}</form>
                </main>
              </div>
            </div>

            <MobileNavigation />
          </div>
        ) : (
          <>
            <div className="flex items-center absolute justify-center flex-wrap top-20 left-0 right-0 bg-white shadow-lg">
              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className="rounded-full border-2 border-primary px-5 py-2 font-bold bg-white text-primary"
              >
                <option value="" disabled>
                  Fonts
                </option>
                <option value="Ubuntu">Ubuntu</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Verdana">Verdana</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Lucida Console">Lucida Console</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="Inter">Inter</option>
              </select>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                setSelectedPdfType={setSelectedPdfType}
                selectedPdfType={selectedPdfType}
              />
            </div>
            <div className="bg-gradient-to-b from-white to-blue-100  ">
              <Highlightmenubar />
              <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            </div>

            <div className="flex items-center justify-center gap-4 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg ">
              <button
                onClick={handleClick}
                className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-primary/30 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 active:bg-primary"
                } text-white transition-colors duration-200`}
                disabled={loading}
              >
                {loading ? <SaveLoader /> : "Save"}
              </button>

              <button
                onClick={downloadAsPDF}
                className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-success/30 cursor-not-allowed"
                    : "bg-success hover:bg-success/90 active:bg-success/90"
                } text-white transition-colors duration-200`}
                disabled={loading}
              >
                {isDownloading ? (
                  <SaveLoader loadingText="Downloading" />
                ) : (
                  "Download"
                )}
              </button>

              <button
                onClick={handleBackToEditor}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors bottom-btns"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upgrade Required
            </h2>
            <p className="text-gray-600 mb-6">
              You’ve reached your download limit. Please upgrade your plan to
              continue.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/payment")}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
