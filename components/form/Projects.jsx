"use client";

import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Trash,
  RefreshCcw,
} from "lucide-react";
import axios from "axios";
import FormButton from "./FormButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ErrorPopup from "../utility/ErrorPopUp";
import Button from "../buttonUIComponent";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Projects = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [popupType, setPopupType] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [keyAchievements, setKeyAchievements] = useState([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });

  const token = localStorage.getItem("token");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );
  const formatDateValue = (month, year) => {
    if (month && year) {
      return `${month},${year}`;
    } else if (month) {
      return month;
    } else if (year) {
      return year;
    } else {
      return "";
    }
  };
  const router = useRouter();
  const { improve } = router.query;

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };
  const handlePresentToggle = (index) => {
    const newProjects = [...resumeData.projects];
    const isPresent = newProjects[index].endYear === "Present";

    newProjects[index].endMonth = isPresent ? "" : newProjects[index].endMonth;
    newProjects[index].endYear = isPresent ? "" : "Present";

    setResumeData({ ...resumeData, projects: newProjects });
  };

  // const handleKeyAchievement = (e, projectIndex) => {
  //   // const newProjects = [...resumeData.projects]
  //   // newProjects[projectIndex].keyAchievements = e.target.value
  //   // setResumeData({ ...resumeData, projects: newProjects })
  //   const newProjects = [...resumeData.projects];
  //   const achievements = e.target.value
  //     .split("\n")
  //     .filter((item) => item.trim());
  //   newProjects[projectIndex].keyAchievements = achievements;
  //   setResumeData({ ...resumeData, projects: newProjects });
  // };
  const handleKeyAchievement = (e, projectIndex) => {
    const newProjects = [...resumeData.projects];
    const achievements = e.target.value.split("\n");

    newProjects[projectIndex].keyAchievements = achievements;

    // Optional: Track user-modified achievements separately if needed
    setSelectedKeyAchievements(achievements); // sync with popup logic

    // setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: [],
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          name: "",
        },
      ],
    });
    setExpandedProjects([...expandedProjects, resumeData.projects.length]);
  };

  const handleMonthChange = (e, index, field) => {
    const newProjects = [...resumeData.projects];
    const newMonth = e.target.value;
    let year = "";
    if (newProjects[index][field]) {
      const parts = newProjects[index][field].split(",");
      if (parts.length > 1) {
        year = parts[1];
      } else if (parts.length === 1 && !months.includes(parts[0])) {
        // If there's only one part and it's not a month, it must be a year
        year = parts[0];
      }
    }

    newProjects[index][field] = formatDateValue(newMonth, year);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleYearChange = (e, index, field) => {
    const newProjects = [...resumeData.projects];
    const newYear = e.target.value;

    // Get the current month value
    let month = "";
    if (newProjects[index][field]) {
      const parts = newProjects[index][field].split(",");
      if (parts.length > 0 && months.includes(parts[0])) {
        month = parts[0];
      }
    }

    // Format the new value
    newProjects[index][field] = formatDateValue(month, newYear);

    setResumeData({ ...resumeData, projects: newProjects });
  };
  const removeProjects = (index) => {
    // Check if this is the last project entry
    if ((resumeData.projects || []).length <= 1) {
      toast.warn("At least one project entry is required");
      // setValidationErrors({
      //   ...validationErrors,
      //   general: "At least one project entry is required"
      // });

      // // Clear the error message after 3 seconds
      // setTimeout(() => {
      //   const updatedErrors = {...validationErrors};
      //   delete updatedErrors.general;
      //   setValidationErrors(updatedErrors);
      // }, 3000);
      return; // Don't remove if it's the last one
    }

    const newProjects = [...(resumeData.projects || [])];
    newProjects.splice(index, 1);

    // Clear any errors related to this index
    // const updatedErrors = {};
    // Object.keys(validationErrors).forEach(key => {
    //   if (!key.startsWith(`${index}-`)) {
    //     updatedErrors[key] = validationErrors[key];
    //   }
    // });
    // setValidationErrors(updatedErrors);

    setResumeData({ ...resumeData, projects: newProjects });
    setExpandedProjects(
      expandedProjects
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    );
  };

  const toggleProjectExpansion = (index, e) => {
    e.preventDefault(); // Prevent the default Button behavior
    setExpandedProjects((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAIAssistKey = async (index) => {
    if (!resumeData.projects[index].name) {
      toast.warn("Project name is Required");
      return;
    }
    if (
      !resumeData.projects[index].startYear ||
      !resumeData.projects[index].endYear
    ) {
      toast.warn("Date is Required");
      return;
    }
    setLoadingStates((prev) => ({
      ...prev,
      [`key_${index}`]: true,
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/ai-resume-project-key-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content:
            resumeData.projects[index].description || "Project description",
          project_name: resumeData.projects[index].name || "N/A",
          job_title: resumeData.projects[index].po || "Project",
          link: resumeData.projects[index].link || "N/A",
          start_date: resumeData.projects[index].startYear,
          end_date: resumeData.projects[index].endYear,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setKeyAchievements(response.data.data.resume_analysis.responsibilities);
      setPopupIndex(index);
      setPopupType("keyAchievements");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
      // toast.error(err.response?.data?.message || "Limit Exhausted");
      setErrorPopup({
        show: true,
        message:
          err.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`key_${index}`]: false,
      }));
    }
  };

  const handleSummarySelect = (item) => {
    if (popupType === "description") {
      setSelectedDescriptions((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      setSelectedKeyAchievements((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };
  // const handleSaveSelectedSummary = (index, e) => {
  //   e.preventDefault();

  //   const newProjects = [...resumeData.projects];
  //   const currentAchievements = newProjects[index].keyAchievements || [];

  //   // Avoid duplicates, respect deletions
  //   const filteredSelected = selectedKeyAchievements.filter(
  //     (item) => !currentAchievements.includes(item)
  //   );

  //   const updatedAchievements = [...currentAchievements, ...filteredSelected];

  //   newProjects[index].keyAchievements = updatedAchievements;
  //   setResumeData({ ...resumeData, projects: newProjects });

  //   // Close popup and clear state
  //   setShowPopup(false);
  //   setSelectedKeyAchievements([]);
  // };
  const handleSaveSelectedSummary = (index, e) => {
    e.preventDefault();

    const newProjects = [...resumeData.projects];

    if (popupType === "keyAchievements") {
      const currentAchievements = newProjects[index].keyAchievements || [];

      // Avoid duplicates
      const filteredSelected = selectedKeyAchievements.filter(
        (item) => !currentAchievements.includes(item)
      );

      const updatedAchievements = [...currentAchievements, ...filteredSelected];

      newProjects[index].keyAchievements = updatedAchievements;
      setSelectedKeyAchievements([]);
    } else if (popupType === "description") {
      if (selectedDescriptions.length > 0) {
        newProjects[index].description = selectedDescriptions[0]; // 🟢 Select only one description
        setSelectedDescriptions([]);
      }
    }

    setResumeData({ ...resumeData, projects: newProjects });

    // Close popup
    setShowPopup(false);
  };
  // const handleSaveSelectedSummary = (index, e) => {
  //   e.preventDefault();
  //   const newProjects = [...resumeData.projects];

  //   if (popupType === "description") {
  //     newProjects[index].description = selectedDescriptions.join(" ");
  //   } else {
  //     newProjects[index].keyAchievements = selectedKeyAchievements;
  //   }

  //   setResumeData({
  //     ...resumeData,
  //     projects: newProjects,
  //   });

  //   setShowPopup(false);
  // };
  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.project_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };
  const handleAutoFixDescription = async (e, projectIndex, content) => {
    if (e) {
      e.preventDefault(); // Stops the form submission (only needed if inside a form)
      e.stopPropagation(); // Prevents event bubbling
    }

    setLoadingStates((prev) => ({
      ...prev,
      [`description_${projectIndex}`]: true,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }
      if (!resumeData.projects[projectIndex].name) {
        toast.warn("Project name is Required");
        return;
      }
      if (!resumeData.position) {
        toast.warn("Job Title is Required");
        return;
      }
      if (
        !resumeData.projects[projectIndex].startYear ||
        !resumeData.projects[projectIndex].endYear
      ) {
        toast.warn("Date is Required");
        return;
      }

      const response = await fetch(
        "https://api.abroadium.com/api/jobseeker/ai-prosummery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "project description",
            keyword: "auto improve",
            content: resumeData.position || "",
            // company_name: content.name || "",
            job_title: resumeData.position || "",
            link: content.link || "",
            project_name: resumeData.projects[projectIndex].name || "N/A",
            start_date: resumeData.projects[projectIndex].startYear,
            end_date: resumeData.projects[projectIndex].endYear,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const updatedDescription = data?.data?.resume_analysis?.project_summary;

      if (updatedDescription) {
        setResumeData((prev) => ({
          ...prev,
          projects: prev.projects.map((proj, i) =>
            i === projectIndex
              ? { ...proj, description: updatedDescription }
              : proj
          ),
        }));

        setResumeStrength((prev) => ({
          ...prev,
          project_strenght: prev.project_strenght.map((strength, i) =>
            i === projectIndex ? { ...strength, description: [] } : strength
          ),
        }));

        setActiveTooltip(null);
        toast.success("Description updated successfully");
      } else {
        toast.error("Failed to auto-fix description");
      }
    } catch (error) {
      console.error(
        `Error auto-fixing project description at index ${projectIndex}:`,
        error
      );
      // console.log(resumeData.position, ">>>>>position");
      toast.error(
        error.response?.data?.message ||
          "An error occurred while processing your request"
      );
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${projectIndex}`]: false,
      }));
    }
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.project_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };
  const handleAIAssistDescription = async (projectIndex) => {
    // console.log(resumeData.projects[projectIndex].name,"llll");
    if (!resumeData.projects[projectIndex].name) {
      toast.warn("Project name is Required");
      return;
    }
    if (
      !resumeData.projects[projectIndex].startYear ||
      !resumeData.projects[projectIndex].endYear
    ) {
      toast.warn("Date is Required");
      return;
    }
    setLoadingStates((prev) => ({
      ...prev,
      [`description_${projectIndex}`]: true,
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/ai-resume-project-summery-data",
        {
          key: "professional_experience",
          keyword:
            "Generate multiple professional summaries and descriptions for professional experience",
          content: resumeData?.position || "Project description",
          project_name: resumeData.projects[projectIndex].name || "N/A",
          job_title: resumeData?.position || "Project",
          link: resumeData.projects[projectIndex].link || "N/A",
          start_date: resumeData.projects[projectIndex].startYear,
          end_date: resumeData.projects[projectIndex].endYear,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDescriptions(response.data.data.resume_analysis.project_summaries);
      setPopupIndex(projectIndex);
      setPopupType("description");
      setShowPopup(true);
    } catch (err) {
      // toast.error(err.response?.data?.message || "Limit Exhausted");
      setErrorPopup({
        show: true,
        message:
          err.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
      setError(err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${projectIndex}`]: false,
      }));
    }
  };

  // Parse date string to get month and year
  // const getDatePart = (dateStr, part) => {
  //   if (!dateStr) return "";
  //   if (dateStr === "Present") return part === "month" ? "" : dateStr;

  //   const parts = dateStr.split(",");

  //   // If there's only one part, determine if it's a month or year
  //   if (parts.length === 1) {
  //     if (months.includes(parts[0]) && part === "month") {
  //       return parts[0];
  //     } else if (!isNaN(parts[0]) && part === "year") {
  //       return parts[0];
  //     } else {
  //       return "";
  //     }
  //   }

  //   // If there are two parts, return the appropriate one
  //   if (part === "month") {
  //     return parts[0] || "";
  //   } else {
  //     return parts[1] || "";
  //   }
  // };
  const getDatePart = (dateStr, part) => {
    if (!dateStr) return "";
    if (dateStr === "Present") return part === "month" ? "" : dateStr;

    const parts = dateStr.split(",");

    // If there's only one part, determine if it's a month or year
    if (parts.length === 1) {
      if (months.includes(parts[0]) && part === "month") {
        return parts[0];
      } else if (!isNaN(parts[0]) && part === "year") {
        return parts[0];
      } else {
        return "";
      }
    }

    // If there are two parts, return the appropriate one
    if (part === "month") {
      return parts[0] || "";
    } else {
      return parts[1] || "";
    }
  };
  return (
    <div className="flex-col-gap-3 w-full md:mt-10 md:px-10">
      <h2 className="input-title text-white text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects?.map((project, projectIndex) => (
          <div
            key={projectIndex}
            className="f-col mt-4 mb-4 border border-gray-300 bg-white rounded-lg p-4"
          >
            <div className="flex  justify-between items-center mb-2">
              <h3 className="text-black text-xl font-semibold">
                {project.name || `Project ${projectIndex + 1}`}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => toggleProjectExpansion(projectIndex, e)}
                  className="text-black"
                  type="button" // Explicitly set the Button type
                >
                  {expandedProjects.includes(projectIndex) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </Button>
                <Button
                  onClick={() => removeProjects(projectIndex)}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors md:ml-2"
                  type="button"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {expandedProjects.includes(projectIndex) && (
              <>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    className={`w-full other-input border  ${
                      improve && hasErrors(projectIndex, "name")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={project.name}
                    onChange={(e) => handleProjects(e, projectIndex)}
                  />

                  {improve && hasErrors(projectIndex, "name") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `name-${projectIndex}`
                            ? null
                            : `name-${projectIndex}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `name-${projectIndex}` && (
                    <div className="absolute z-50 right-0  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Project Name Suggestion
                            </span>
                          </div>
                          <Button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(projectIndex, "name").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between mb-2">
                  <div className="relative ">
                    <label className="text-black">Link </label>
                    <input
                      type="text"
                      placeholder="Link"
                      name="link"
                      className={`w-full other-input border  ${
                        improve && hasErrors(projectIndex, "link")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={project.link}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    />
                    {improve && hasErrors(projectIndex, "link") && (
                      <Button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                        onClick={() =>
                          setActiveTooltip(
                            activeTooltip === `link-${projectIndex}`
                              ? null
                              : `link-${projectIndex}`
                          )
                        }
                      >
                        <AlertCircle className="w-5 h-5" />
                      </Button>
                    )}
                    {activeTooltip === `link-${projectIndex}` && (
                      <div className="absolute z-50 right-0  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5 text-red-400" />
                              <span className="font-medium text-black">
                                Project Link
                              </span>
                            </div>
                            <Button
                              onClick={() => setActiveTooltip(null)}
                              className="text-black transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          {getErrorMessages(projectIndex, "link").map(
                            (msg, i) => (
                              <div
                                key={i}
                                className="flex items-start space-x-3 mb-3 last:mb-0"
                              >
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                                <p className="text-black text-sm">{msg}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  {/* Start Date */}
                  <label className="text-black">Start Date</label>
                  <div className="flex flex-wrap gap-2 relative">
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(projectIndex, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(project.startYear, "month")}
                      onChange={(e) =>
                        handleMonthChange(e, projectIndex, "startYear")
                      }
                    >
                      <option value="">Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(projectIndex, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(project.startYear, "year")}
                      onChange={(e) =>
                        handleYearChange(e, projectIndex, "startYear")
                      }
                    >
                      <option value="">Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                    {improve && hasErrors(projectIndex, "startYear") && (
                      <>
                        <Button
                          type="button"
                          className="absolute right-[2px] top-[-1.5rem] text-red-500"
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === `startYear-${projectIndex}`
                                ? null
                                : `startYear-${projectIndex}`
                            )
                          }
                        >
                          <AlertCircle className="w-5 h-5" />
                        </Button>

                        {activeTooltip === `startYear-${projectIndex}` && (
                          <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-xl border border-gray-700 z-50">
                            <div className="p-4 border-b border-gray-700">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <AlertCircle className="w-5 h-5 text-red-400" />
                                  <span className="font-medium text-black">
                                    Start Date Issues
                                  </span>
                                </div>
                                <Button
                                  onClick={() => setActiveTooltip(null)}
                                  className="text-black transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              {getErrorMessages(projectIndex, "startYear").map(
                                (msg, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start space-x-3 mb-3 last:mb-0"
                                  >
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                                    <p className="text-black text-sm">{msg}</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* End Date */}
                  <label className="mt-4 block text-black">End Date</label>
                  <div className="flex flex-wrap gap-2 relative">
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(projectIndex, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(project.endYear, "month")}
                      onChange={(e) =>
                        handleMonthChange(e, projectIndex, "endYear")
                      }
                      disabled={project.endYear === "Present"}
                    >
                      <option value="">Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(projectIndex, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(project.endYear, "year")}
                      onChange={(e) =>
                        handleYearChange(e, projectIndex, "endYear")
                      }
                      disabled={project.endYear === "Present"}
                    >
                      <option value="">Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <label className="flex flex-1 items-center gap-1 other-input text-xl">
                      <input
                        type="checkbox"
                        checked={project.endYear === "Present"}
                        onChange={() => handlePresentToggle(projectIndex)}
                        className="w-6 h-6"
                      />
                      Present
                    </label>

                    {improve && hasErrors(projectIndex, "endYear") && (
                      <>
                        <Button
                          type="button"
                          className="absolute right-[2px] top-[-1.5rem] text-red-500"
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === `endYear-${projectIndex}`
                                ? null
                                : `endYear-${projectIndex}`
                            )
                          }
                        >
                          <AlertCircle className="w-5 h-5" />
                        </Button>

                        {activeTooltip === `endYear-${projectIndex}` && (
                          <div className="absolute right-0  w-80 bg-white rounded-lg shadow-xl border border-gray-700 z-50">
                            <div className="p-4 border-b border-gray-700">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <AlertCircle className="w-5 h-5 text-red-400" />
                                  <span className="font-medium text-black">
                                    End Date Issues
                                  </span>
                                </div>
                                <Button
                                  onClick={() => setActiveTooltip(null)}
                                  className="text-black transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              {getErrorMessages(projectIndex, "endYear")?.map(
                                (msg, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start space-x-3 mb-3 last:mb-0"
                                  >
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                                    <p className="text-black text-sm">{msg}</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Description</label>
                    <Button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => handleAIAssistDescription(projectIndex)}
                      disabled={loadingStates[`description_${projectIndex}`]}
                    >
                      {loadingStates[`description_${projectIndex}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </Button>
                  </div>

                  <ReactQuill
                    placeholder="Description"
                    value={project.description}
                    onChange={(value) =>
                      handleProjects(
                        {
                          target: {
                            name: "description",
                            value: value,
                          },
                        },
                        projectIndex
                      )
                    }
                    className={`bg-white rounded-md ${
                      improve && hasErrors(projectIndex, "description")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    theme="snow"
                    modules={{
                      toolbar: [["bold", "italic", "underline"], ["clean"]],
                    }}
                  />

                  {improve && hasErrors(projectIndex, "description") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `description-${projectIndex}`
                            ? null
                            : `description-${projectIndex}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `description-${projectIndex}` && (
                    <div className="absolute z-50 right-0 top-[50px] w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Description Suggestions
                            </span>
                          </div>

                          <Button
                            type="button" // Prevent form submission if inside a form
                            onClick={(e) =>
                              handleAutoFixDescription(e, projectIndex, project)
                            }
                            onMouseDown={() => {
                              if (!project?.name) {
                                toast.error("Title is required");
                              }
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              loadingStates[`description_${projectIndex}`] ||
                              !project?.name
                            }
                          >
                            {loadingStates[`description_${projectIndex}`]
                              ? "Fixing..."
                              : "Auto Fix"}
                          </Button>

                          <Button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(projectIndex, "description").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 relative">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Key Achievements</label>
                    <Button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => handleAIAssistKey(projectIndex)}
                      disabled={loadingStates[`key_${projectIndex}`]}
                    >
                      {loadingStates[`key_${projectIndex}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </Button>
                  </div>

                  <textarea
                    placeholder="Enter key achievements (one per line)"
                    className="w-full other-input border-black border "
                    value={
                      Array.isArray(project?.keyAchievements)
                        ? project.keyAchievements.join("\n")
                        : project?.keyAchievements || ""
                    }
                    onChange={(e) => handleKeyAchievement(e, projectIndex)}
                  />

                  {improve && hasErrors(projectIndex, "keyAchievements") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `keyAchievements-${projectIndex}`
                            ? null
                            : `keyAchievements-${projectIndex}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}

                  {activeTooltip === `keyAchievements-${projectIndex}` && (
                    <div className="absolute z-50 right-0 top-8 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Key Achievements Suggestions
                            </span>
                          </div>
                          <Button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(projectIndex, "keyAchievements").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => removeProjects(projectIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  type="button"
                >
                  Remove Project
                </Button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-white my-2">
          No projects available. Add a new project to get started.
        </p>
      )}
      {/* <Button onClick={addProjects} className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button">
        Add Project
      </Button> */}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
      {/* {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {popupType === "description"
                ? "Select Description"
                : "Select Key Achievements"}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(popupType === "description" ? descriptions : keyAchievements)
                ?.length > 0 ? (
                // Rendering the list items when data exists
                (popupType === "description"
                  ? descriptions
                  : keyAchievements
                )?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Radio for description (Single Select) 
                    {popupType === "description" ? (
                      <input
                        type="radio"
                        name="description" // Ensures only one can be selected
                        checked={selectedDescriptions.includes(item)}
                        onChange={() => setSelectedDescriptions([item])} // Only one selection
                        className="mt-1"
                      />
                    ) : (
                      // Checkbox for key achievements (Multi Select)
                      <input
                        type="checkbox"
                        checked={selectedKeyAchievements.includes(item)}
                        onChange={() => handleSummarySelect(item)}
                        className="mt-1"
                      />
                    )}
                    <p className="text-gray-800">{item}</p>
                  </div>
                ))
              ) : (
                // Fallback message when no data is available
                <div className="text-center py-2">
                  <p className="text-gray-500">
                    {popupType === "description"
                      ? "No descriptions available. "
                      : "No key achievements available. "}
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
              className={`mt-4 px-4 py-2 rounded text-white ${
                (popupType === "description" ? descriptions : keyAchievements)
                  ?.length > 0
                  ? "bg-gray-800 hover:bg-gray-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={
                (popupType === "description" ? descriptions : keyAchievements)
                  ?.length === 0
              }
            >
              Save Selection
            </Button>
            {console.log(popupIndex,"POPOPOP")}
            <Button
              onClick={() =>
                popupType === "description"
                  ? handleAIAssistDescription(popupIndex)
                  : handleAIAssistKey(popupIndex)
              }
              className="mt-4 ml-2 flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-400 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-500 transition-all duration-300 ease-in-out"
            >
              <RefreshCcw className="w-5 h-5" />
              Retry Smart Assist
            </Button>
            <Button
              onClick={() => setShowPopup(false)}
              className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </Button>
          </div>
        </div>
      )} */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {popupType === "description"
                ? "Select Description"
                : "Select Key Achievements"}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(popupType === "description" ? descriptions : keyAchievements)
                ?.length > 0 ? (
                // Rendering the list items when data exists
                (popupType === "description"
                  ? descriptions
                  : keyAchievements
                )?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Radio for description (Single Select) */}
                    {popupType === "description" ? (
                      <input
                        type="radio"
                        name="description" // Ensures only one can be selected
                        checked={selectedDescriptions.includes(item)}
                        onChange={() => setSelectedDescriptions([item])} // Only one selection
                        className="mt-1"
                      />
                    ) : (
                      // Checkbox for key achievements (Multi Select)
                      <input
                        type="checkbox"
                        checked={selectedKeyAchievements.includes(item)}
                        onChange={() => handleSummarySelect(item)}
                        className="mt-1"
                      />
                    )}
                    <p className="text-gray-800">{item}</p>
                  </div>
                ))
              ) : (
                // Fallback message when no data is available
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">
                    {popupType === "description"
                      ? "No descriptions available."
                      : "No key achievements available."}
                  </p>
                  <Button
                    onClick={() => {
                      if (popupType === "description") {
                        handleAIAssistDescription(popupIndex);
                      } else {
                        handleAIAssistKey(popupIndex);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={
                      loadingStates[
                        `${
                          popupType === "description" ? "description" : "key"
                        }_${popupIndex}`
                      ]
                    }
                  >
                    {loadingStates[
                      `${
                        popupType === "description" ? "description" : "key"
                      }_${popupIndex}`
                    ]
                      ? "Retrying..."
                      : "Retry"}
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
              className={`mt-4 px-4 py-2 rounded text-white ${
                (popupType === "description" ? descriptions : keyAchievements)
                  ?.length > 0
                  ? "bg-gray-800 hover:bg-gray-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={
                (popupType === "description" ? descriptions : keyAchievements)
                  ?.length === 0
              }
            >
              Save Selection
            </Button>
            <Button
              onClick={() => setShowPopup(false)}
              className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {errorPopup.show && (
        <ErrorPopup
          message={errorPopup.message}
          onClose={() => setErrorPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

export default Projects;
