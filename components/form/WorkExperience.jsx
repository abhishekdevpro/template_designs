import React, { useContext, useState, useEffect, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import {
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Trash2,
  Trash,
} from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ErrorPopup from "../utility/ErrorPopUp";
import Button from "../buttonUIComponent";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WorkExperience = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [expandedExperiences, setExpandedExperiences] = useState([]);
  const [popupType, setPopupType] = useState(""); // Track popup type
  const [descriptions, setDescriptions] = useState([]); // Stores descriptions
  const [keyAchievements, setKeyAchievements] = useState([]); // Stores key achievements

  const [selectedDescriptions, setSelectedDescriptions] = useState([]); // Stores selected descriptions
  const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([]); // Stores selected key achievements
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });
  const token = localStorage.getItem("token");
  const router = useRouter();
  const { improve } = router.query;
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
  const handleMonthChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const newMonth = e.target.value;
    let year = "";
    if (newWorkExperience[index][field]) {
      const parts = newWorkExperience[index][field].split(",");
      if (parts.length > 1) {
        year = parts[1];
      } else if (parts.length === 1 && !months.includes(parts[0])) {
        // If there's only one part and it's not a month, it must be a year
        year = parts[0];
      }
    }

    newWorkExperience[index][field] = formatDateValue(newMonth, year);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleYearChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const newYear = e.target.value;

    // Get the current month value
    let month = "";
    if (newWorkExperience[index][field]) {
      const parts = newWorkExperience[index][field].split(",");
      if (parts.length > 0 && months.includes(parts[0])) {
        month = parts[0];
      }
    }

    // Format the new value
    newWorkExperience[index][field] = formatDateValue(month, newYear);

    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };
  const handlePresentToggle = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].endYear =
      newWorkExperience[index].endYear === "Present" ? "" : "Present";
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleWorkExperience = (e, index) => {
    const { name, value } = e.target;
    const newWorkExperience = [...resumeData.workExperience];

    if (name === "keyAchievements") {
      const lines = value
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      newWorkExperience[index][name] = lines.length > 0 ? lines : [];
    } else {
      newWorkExperience[index][name] = value;
    }

    setResumeData({ ...resumeData, workExperience: newWorkExperience });

    if (name === "position") {
      fetchJobTitles(value);
    } else if (name === "company") {
      fetchCompanies(value);
    } else if (name === "location") {
      fetchLocations(value);
    }
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker/locations?locations=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const locations = data.data.location_names.map((item) => item);
        setLocationSuggestions(locations);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading((prev) => ({ ...prev, location: false }));
  };

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.data && response.data.data) {
        setJobTitleSuggestions(response.data.data);
        setShowJobTitleDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
  };

  const fetchCompanies = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setCompanySuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/compnay-list?company_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.data && response.data.data) {
        setCompanySuggestions(response.data.data);
        setShowCompanyDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleLocationSelect = (location, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].location = location;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
  };

  const handleJobTitleSelect = (jobTitle, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].position = jobTitle;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setJobTitleSuggestions([]);
    setShowJobTitleDropdown(false);
  };

  const handleCompanySelect = (company, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].company = company;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setCompanySuggestions([]);
    setShowCompanyDropdown(false);
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience({ target: { name: "description", value } }, index);
  };

  const handleAIAssistDescription = async (index) => {
    if (
      !resumeData.workExperience[index].startYear ||
      !resumeData.workExperience[index].endYear
    ) {
      toast.warn("Date is Required");
      return;
    }
    setLoadingStates((prev) => ({
      ...prev,
      [`description_${index}`]: true, // ✅ Separate loading state for description
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/ai-resume-profexp-summery-data",
        {
          key: "professional_experience",
          keyword:
            "Generate multiple professional summaries and descriptions for professional experience",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
          start_date: resumeData.workExperience[index].startYear,
          end_date: resumeData.workExperience[index].endYear,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDescriptions(
        response.data.data.resume_analysis.professional_summaries
      ); // ✅ Store in descriptions state
      setPopupIndex(index);
      setPopupType("description");
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
        [`description_${index}`]: false, // ✅ Reset only description Button
      }));
    }
  };

  const handleAIAssistKey = async (index) => {
    if (
      !resumeData.workExperience[index].startYear ||
      !resumeData.workExperience[index].endYear
    ) {
      toast.warn("Date is Required");
      return;
    }
    setLoadingStates((prev) => ({
      ...prev,
      [`key_${index}`]: true, // ✅ Separate loading state for key achievements
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/ai-resume-profexp-key-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
          start_date: resumeData.workExperience[index].startYear,
          end_date: resumeData.workExperience[index].endYear,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setKeyAchievements(response.data.data.resume_analysis.responsibilities); // ✅ Store in keyAchievements state
      setPopupIndex(index);
      setPopupType("keyAchievements");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
      setErrorPopup({
        show: true,
        message:
          err.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
      // toast.error(err.response?.data?.message || "Limit Exhausted");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`key_${index}`]: false, // ✅ Reset only key achievements Button
      }));
    }
  };
  const handleKeyAchievement = (e, index) => {
    const newWorkExperience = [...resumeData.workExperience];

    // Don't filter out empty strings - this is the key change
    const achievements = e.target.value.split("\n");

    newWorkExperience[index].keyAchievements = achievements;

    // Optional: Track user-modified achievements separately if needed
    setSelectedKeyAchievements(achievements); // sync with popup logic

    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };
  // const handleKeyAchievement = (e, index) => {
  //   const newWorkExperience = [...resumeData.workExperience];
  //   const achievements = e.target.value
  //     .split("\n")
  //     .map((item) => item.trim())
  //     .filter((item) => item !== "");

  //   newWorkExperience[index].keyAchievements = achievements;

  //   // Optional: Track user-modified achievements separately if needed
  //   setSelectedKeyAchievements(achievements); // sync with popup logic

  //   setResumeData({ ...resumeData, workExperience: newWorkExperience });
  // };
  // const handleKeyAchievement = (e, index) => {
  //   const newWorkExperience = [...resumeData.workExperience];
  //   const achievements = e.target.value
  //     .split("\n")
  //     .filter((item) => item.trim());
  //   newWorkExperience[index].keyAchievements = achievements;
  //   setResumeData({ ...resumeData, workExperience: newWorkExperience });
  // };

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
  //   const newWorkExperience = [...resumeData.workExperience];

  //   if (popupType === "description") {
  //     newWorkExperience[index].description = selectedDescriptions.join(" ");
  //   } else {
  //     newWorkExperience[index].keyAchievements = selectedKeyAchievements;
  //   }

  //   setResumeData({
  //     ...resumeData,
  //     workExperience: newWorkExperience,
  //   });

  //   setShowPopup(false);
  // };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          startYear: "",
          endYear: "",
          location: "",
          description: "",
          keyAchievements: [],
        },
      ],
    });
    setExpandedExperiences([...expandedExperiences, true]);
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    const newExpandedExperiences = [...expandedExperiences];
    newExpandedExperiences.splice(index, 1);
    setExpandedExperiences(newExpandedExperiences);
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (e.key === "Enter" && value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.abroadium.com/api/jobseeker/ai-resume-profexp-data",
          {
            key: "professional_experience",
            keyword: value,
            content: value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSearchResults(
          response.data.data.resume_analysis.responsibilities || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchResultSelect = (result, index) => {
    const currentDescription =
      resumeData.workExperience[index].description || "";
    const newDescription = currentDescription
      ? `${currentDescription}\n${result}`
      : result;
    handleDescriptionChange(newDescription, index);
    setSearchValue("");
    setSearchResults([]);
  };

  const toggleExperience = (index) => {
    setExpandedExperiences((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  // const handleSaveSelectedSummary = (index, e) => {
  //   e.preventDefault();

  //   const newWorkExperience = [...resumeData.workExperience];
  //   const currentAchievements = newWorkExperience[index].keyAchievements || [];

  //   // Avoid duplicates, respect deletions
  //   const filteredSelected = selectedKeyAchievements.filter(
  //     (item) => !currentAchievements.includes(item)
  //   );

  //   const updatedAchievements = [...currentAchievements, ...filteredSelected];

  //   newWorkExperience[index].keyAchievements = updatedAchievements;
  //   setResumeData({ ...resumeData, workExperience: newWorkExperience });

  //   // Close popup and clear state
  //   setShowPopup(false);
  //   setSelectedKeyAchievements([]);
  // };
  const handleSaveSelectedSummary = (index, e) => {
    e.preventDefault();

    const newWorkExperience = [...resumeData.workExperience];

    if (popupType === "keyAchievements") {
      const currentAchievements =
        newWorkExperience[index].keyAchievements || [];

      // Avoid duplicates
      const filteredSelected = selectedKeyAchievements.filter(
        (item) => !currentAchievements.includes(item)
      );

      const updatedAchievements = [...currentAchievements, ...filteredSelected];

      newWorkExperience[index].keyAchievements = updatedAchievements;
      setSelectedKeyAchievements([]);
    } else if (popupType === "description") {
      if (selectedDescriptions.length > 0) {
        newWorkExperience[index].description = selectedDescriptions[0]; // 🟢 Select only one description
        setSelectedDescriptions([]);
      }
    }

    setResumeData({ ...resumeData, workExperience: newWorkExperience });

    // Close popup
    setShowPopup(false);
  };

  const handleAutoFixDescription = async (e, index, content) => {
    e.preventDefault(); // Stops form submission (only needed if inside a form)
    e.stopPropagation(); // Stops event bubbling

    setLoadingStates((prev) => ({
      ...prev,
      [`description_${index}`]: true,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      const response = await fetch(
        "https://api.abroadium.com/api/jobseeker/ai-expsummery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "experience description",
            keyword: "auto improve",
            content: content.description || "",
            company_name: content.company || "",
            job_title: content.position,
            location: content.location || "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const updatedDescription =
        data?.data?.resume_analysis?.professional_summary;

      if (updatedDescription) {
        // Update work experience description
        setResumeData((prev) => ({
          ...prev,
          workExperience: prev.workExperience.map((exp, i) =>
            i === index ? { ...exp, description: updatedDescription } : exp
          ),
        }));

        // Clear any errors in resumeStrength
        setResumeStrength((prev) => ({
          ...prev,
          work_experience_strenght: prev.work_experience_strenght.map(
            (strength, i) =>
              i === index ? { ...strength, descriptionDetails: [] } : strength
          ),
        }));

        // Close the tooltip
        setActiveTooltip(null);

        toast.success("Description updated successfully");
      } else {
        toast.error("Failed to auto-fix description");
      }
    } catch (error) {
      console.error(
        `Error auto-fixing experience description at index ${index}:`,
        error
      );
      toast.error("An error occurred while processing your request");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${index}`]: false,
      }));
    }
  };

  const handleToggleFresher = (e) => {
    e.preventDefault();
    setResumeData((prevData) => ({
      ...prevData,
      is_fresher: !prevData.is_fresher,
      workExperience: prevData.workExperience,
    }));
  };

  // const removeWork = (index) => {
  //   const newworkExperience = [...(resumeData.workExperience || [])];
  //   newworkExperience.splice(index, 1);
  //   setResumeData({ ...resumeData, workExperience: newworkExperience });
  //   setExpandedExperiences(
  //     expandedExperiences
  //       .filter((i) => i !== index)
  //       .map((i) => (i > index ? i - 1 : i))
  //   );
  // };
  const removeWork = (index) => {
    if ((resumeData.workExperience || []).length <= 1) {
      toast.warn("At least one work experience entry is required");
      return;
    }
    const newworkExperience = [...(resumeData.workExperience || [])];
    newworkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newworkExperience });
    setExpandedExperiences(
      expandedExperiences
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    );
  };
  // Parse date string to get month and year
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
    <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
      <h2 className="input-title text-white text-3xl mb-6">Work Experience</h2>
      <div className="flex items-center space-x-2 mb-4">
        <label className="text-lg text-white font-medium">
          Are you a Fresher?
        </label>
        <Button
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            resumeData.is_fresher ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={handleToggleFresher}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
              resumeData.is_fresher ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </Button>
      </div>

      {!resumeData.is_fresher &&
        resumeData.workExperience.map((experience, index) => (
          <div key={index} className="mb-6 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-white"
              onClick={() => toggleExperience(index)}
            >
              <h3 className="text-black text-xl font-semibold">
                {experience.position ||
                  experience.company ||
                  `Work Experience ${index + 1}`}
              </h3>
              <div className="flex items-center gap-2">
                {expandedExperiences[index] ? (
                  <ChevronUp className="w-6 h-6 text-black" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-black" />
                )}
                <Button
                  onClick={() => removeWork(index)}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors md:ml-2"
                  type="button"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {expandedExperiences[index] && (
              <div className="p-4 bg-white">
                <div className="relative mb-4">
                  <label className="text-black">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "company")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.company}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {showCompanyDropdown && companySuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {companySuggestions.map((company, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleCompanySelect(company.name, index)
                          }
                        >
                          {company.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "company") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `company-${index}`
                            ? null
                            : `company-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `company-${index}` && (
                    <div className="absolute z-50 right-0  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Company Suggestions
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
                        {getErrorMessages(index, "company").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <label className="text-black">Job Title</label>
                  <input
                    type="text"
                    placeholder="Position"
                    name="position"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "position")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.position}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {showJobTitleDropdown && jobTitleSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {jobTitleSuggestions.map((jobTitle, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleJobTitleSelect(jobTitle.name, index)
                          }
                        >
                          {jobTitle.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "position") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `position-${index}`
                            ? null
                            : `position-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `position-${index}` && (
                    <div className="absolute z-50 right-0  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Position Suggestions
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
                        {getErrorMessages(index, "position").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  {/* Start Date */}
                  <label className="text-black">Start Date</label>
                  <div className="flex flex-wrap gap-2 relative">
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(index, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(experience.startYear, "month")}
                      onChange={(e) => handleMonthChange(e, index, "startYear")}
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
                        improve && hasErrors(index, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(experience.startYear, "year")}
                      onChange={(e) => handleYearChange(e, index, "startYear")}
                    >
                      <option value="">Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                    {improve && hasErrors(index, "startYear") && (
                      <>
                        <Button
                          type="button"
                          className="absolute right-[2px] top-[-1.5rem] text-red-500"
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === `startYear-${index}`
                                ? null
                                : `startYear-${index}`
                            )
                          }
                        >
                          <AlertCircle className="w-5 h-5" />
                        </Button>

                        {activeTooltip === `startYear-${index}` && (
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
                              {getErrorMessages(index, "startYear").map(
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
                        improve && hasErrors(index, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(experience.endYear, "month")}
                      onChange={(e) => handleMonthChange(e, index, "endYear")}
                      disabled={experience.endYear === "Present"}
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
                        improve && hasErrors(index, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={getDatePart(experience.endYear, "year")}
                      onChange={(e) => handleYearChange(e, index, "endYear")}
                      disabled={experience.endYear === "Present"}
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
                        checked={experience.endYear === "Present"}
                        onChange={() => handlePresentToggle(index)}
                        className="w-6 h-6"
                      />
                      Present
                    </label>

                    {improve && hasErrors(index, "endYear") && (
                      <>
                        <Button
                          type="button"
                          className="absolute right-[2px] top-[-1.5rem] text-red-500"
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === `endYear-${index}`
                                ? null
                                : `endYear-${index}`
                            )
                          }
                        >
                          <AlertCircle className="w-5 h-5" />
                        </Button>

                        {activeTooltip === `endYear-${index}` && (
                          <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-xl border border-gray-700 z-50">
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
                              {getErrorMessages(index, "endYear")?.map(
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
                  <label className="mt-2 text-black">Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "location")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.location}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {isLoading.location && (
                    <div className="absolute right-3 top-1/2 transform translate-y-1">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  {showLocationDropdown && locationSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {locationSuggestions.map((location, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleLocationSelect(location, index)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "location") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `location-${index}`
                            ? null
                            : `location-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `location-${index}` && (
                    <div className="absolute z-50 right-0  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Location Suggestions
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
                        {getErrorMessages(index, "location").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Description</label>

                    <Button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => {
                        if (experience?.position) {
                          handleAIAssistDescription(index, experience);
                        } else {
                          toast.error("Job Title is required");
                        }
                      }}
                      disabled={loadingStates[`description_${index}`]} // Check loading state per Button
                    >
                      {loadingStates[`description_${index}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </Button>
                  </div>
                  <ReactQuill
                    placeholder="Description"
                    value={experience.description}
                    onChange={(value) => handleDescriptionChange(value, index)}
                    className={`bg-white rounded-md ${
                      improve && hasErrors(index, "descriptionDetails")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    theme="snow"
                    modules={{
                      toolbar: [["bold", "italic", "underline"], ["clean"]],
                    }}
                  />
                  {improve && hasErrors(index, "descriptionDetails") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `description-${index}`
                            ? null
                            : `description-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `description-${index}` && (
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
                            type="button" // Ensure it's NOT a submit Button
                            onClick={(e) =>
                              handleAutoFixDescription(e, index, experience)
                            }
                            onMouseDown={() => {
                              if (!experience?.position) {
                                toast.error("Job Title is required");
                              }
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              loadingStates[`description_${index}`] ||
                              !experience?.position
                            }
                          >
                            {loadingStates[`description_${index}`]
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
                        {getErrorMessages(index, "descriptionDetails").map(
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

                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Key Achievements</label>
                    <Button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => {
                        if (experience?.position) {
                          handleAIAssistKey(index, experience);
                        } else {
                          toast.error("Job Title is required");
                        }
                      }}
                      disabled={loadingStates[`key_${index}`]} // Check loading state per Button
                    >
                      {loadingStates[`key_${index}`]
                        ? "Loading..."
                        : "+ Key Assist"}
                    </Button>
                  </div>

                  <textarea
                    placeholder="Enter key achievements (one per line)"
                    className="w-full other-input border-black border"
                    // value={experience.keyAchievements}
                    value={
                      Array.isArray(experience?.keyAchievements)
                        ? experience.keyAchievements.join("\n")
                        : experience?.keyAchievements
                    }
                    onChange={(e) => handleKeyAchievement(e, index)}
                  />
                  {improve && hasErrors(index, "keyAchievements") && (
                    <Button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `achievements-${index}`
                            ? null
                            : `achievements-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}
                  {activeTooltip === `achievements-${index}` && (
                    <div className="absolute z-50 top-8 right-0 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Achievement Suggestions
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
                      <div className="p-4 ">
                        {getErrorMessages(index, "keyAchievements").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0 "
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
                  onClick={() => removeWork(index)}
                  className="bg-red-500 w-full text-white px-4 py-2 rounded mt-4"
                  type="button"
                >
                  Remove Work Experience
                </Button>
              </div>
            )}
          </div>
        ))}

      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />

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
                (popupType === "description"
                  ? descriptions
                  : keyAchievements
                )?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {popupType === "description" ? (
                      <input
                        type="radio"
                        name="description"
                        checked={selectedDescriptions.includes(item)}
                        onChange={() => setSelectedDescriptions([item])}
                        className="mt-1"
                      />
                    ) : (
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

      {searchResults.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2">
          {searchResults.map((result, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultSelect(result, popupIndex)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
