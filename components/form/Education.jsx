import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { AlertCircle, X, Loader2, Trash2, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "../buttonUIComponent";

const Education = () => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [universitySuggestions, setUniversitySuggestions] = useState([]);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState({
    university: false,
    location: false,
  });
  const router = useRouter();
  const { improve } = router.query;

  const handleEducation = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index][name] = value;
    setResumeData({ ...resumeData, education: newEducation });

    if (name === "school") {
      fetchUniversities(value, index);
    }
    if (name == "degree") {
      fetchDegrees(value, index);
    }
    if (name === "location") {
      fetchLocations(value);
    }
  };

  const fetchUniversities = async (keyword, index) => {
    if (!keyword || keyword.length < 1) {
      setUniversitySuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, university: true }));
    try {
      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker/university-lists?university_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setUniversitySuggestions(data?.data?.map((item) => item.name));
        setShowUniversityDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
    setIsLoading((prev) => ({ ...prev, university: false }));
  };

  const fetchDegrees = async (keyword, index) => {
    if (!keyword || keyword.length < 1) {
      setDegreeSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, degree: true }));
    try {
      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker/degree?degree_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setDegreeSuggestions(data.data.map((item) => item.name));
        setShowDegreeDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching degrees:", error);
    }
    setIsLoading((prev) => ({ ...prev, degree: false }));
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

  const selectUniversity = (value, index) => {
    const newEducation = [...resumeData.education];
    newEducation[index].school = value;
    setResumeData({ ...resumeData, education: newEducation });
    setShowUniversityDropdown(false);
  };

  const selectLocation = (value, index) => {
    const newEducation = [...resumeData.education];
    newEducation[index].location = value;
    setResumeData({ ...resumeData, education: newEducation });
    setShowLocationDropdown(false);
  };

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

  // Fix to prevent comma-only values
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
    const newEducation = [...resumeData.education];
    const newMonth = e.target.value;

    // Get the current year value
    let year = "";
    if (newEducation[index][field]) {
      const parts = newEducation[index][field].split(",");
      if (parts.length > 1) {
        year = parts[1];
      } else if (parts.length === 1 && !months.includes(parts[0])) {
        // If there's only one part and it's not a month, it must be a year
        year = parts[0];
      }
    }

    // Format the new value
    newEducation[index][field] = formatDateValue(newMonth, year);

    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleYearChange = (e, index, field) => {
    const newEducation = [...resumeData.education];
    const newYear = e.target.value;

    // Get the current month value
    let month = "";
    if (newEducation[index][field]) {
      const parts = newEducation[index][field].split(",");
      if (parts.length > 0 && months.includes(parts[0])) {
        month = parts[0];
      }
    }

    // Format the new value
    newEducation[index][field] = formatDateValue(month, newYear);

    setResumeData({ ...resumeData, education: newEducation });
  };

  const handlePresentToggle = (index) => {
    const newEducation = [...resumeData.education];
    newEducation[index].endYear =
      newEducation[index].endYear === "Present" ? "" : "Present";
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: "",
          degree: "",
          startYear: "",
          endYear: "",
          location: "",
        },
      ],
    });
  };

  // const removeEducation = (index) => {
  //   const newEducation = [...resumeData.education];
  //   newEducation.splice(index, 1);
  //   setResumeData({ ...resumeData, education: newEducation });
  // };

  const removeEducation = (index) => {
    // Check if this is the last education entry
    if (resumeData.education.length <= 1) {
      toast.warn("At least one Education is required");

      // Clear the error message after 3 seconds
      // setTimeout(() => {
      //   // const updatedErrors = {...validationErrors};
      //   delete updatedErrors.general;
      //   setValidationErrors(updatedErrors);
      // }, 3000);
      return; // Don't remove if it's the last one
    }

    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);

    // Clear any errors related to this index
    // const updatedErrors = {};
    // Object.keys(validationErrors).forEach(key => {
    //   if (!key.startsWith(`${index}-`)) {
    //     updatedErrors[key] = validationErrors[key];
    //   }
    // });
    // setValidationErrors(updatedErrors);

    setResumeData({ ...resumeData, education: newEducation });
  };

  const hasErrors = (index, field) => {
    const educationStrength = resumeStrength?.education_strenght?.[index];
    return educationStrength && educationStrength[field] !== null;
  };

  const getErrorMessage = (index, field) => {
    const educationStrength = resumeStrength?.education_strenght?.[index];
    if (educationStrength && Array.isArray(educationStrength[field])) {
      return educationStrength[field];
    }
    return null;
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

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowUniversityDropdown(false);
      setShowLocationDropdown(false);
      setShowDegreeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Clean up any existing data that might have just commas
  React.useEffect(() => {
    const needsCleanup = resumeData.education?.some(
      (edu) => edu.startYear === "," || edu.endYear === ","
    );

    if (needsCleanup) {
      const cleanedEducation = resumeData.education.map((edu) => ({
        ...edu,
        startYear: edu.startYear === "," ? "" : edu.startYear,
        endYear: edu.endYear === "," ? "" : edu.endYear,
      }));

      setResumeData({
        ...resumeData,
        education: cleanedEducation,
      });
    }
  }, []);

  const renderTooltip = (index, field, title) => {
    if (activeTooltip === `${field}-${index}`) {
      return (
        <div className="absolute z-50 right-0 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium text-black">
                  {title || "Suggestions"}
                </span>
              </div>
              <Button
                onClick={() => setActiveTooltip(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            {getErrorMessage(index, field)?.map((msg, i) => (
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
      );
    }
    return null;
  };

  return (
    <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
      <h2 className="input-title text-white text-3xl">Education</h2>
      {resumeData.education && resumeData.education.length > 0 ? (
        resumeData.education?.map((education, index) => (
          <div key={index} className="f-col">
            <div className="relative mb-4">
              <div className="flex items-center justify-between mt-4 pb-4">
                <h3 className="text-white text-xl font-semibold">
                  {`Education ${index + 1}`}
                </h3>
                <Button
                  type="button"
                  onClick={() => removeEducation(index)}
                  aria-label="Remove"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  <Trash />
                </Button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="School"
                  name="school"
                  className={`w-full other-input border ${
                    hasErrors(index, "school")
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={education.school}
                  onChange={(e) => handleEducation(e, index)}
                  onClick={(e) => e.stopPropagation()}
                />
                {isLoading.university && (
                  <div className="absolute right-8 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
                {improve && hasErrors(index, "school") && (
                  <Button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                    onClick={() =>
                      setActiveTooltip(
                        activeTooltip === `school-${index}`
                          ? null
                          : `school-${index}`
                      )
                    }
                  >
                    <AlertCircle className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {showUniversityDropdown && universitySuggestions?.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {universitySuggestions.map((university, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                      onClick={() => selectUniversity(university, index)}
                    >
                      {university}
                    </div>
                  ))}
                </div>
              )}

              {renderTooltip(index, "school", "School Suggestions")}
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Degree"
                name="degree"
                className={`w-full other-input border ${
                  improve && hasErrors(index, "degree")
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={education.degree}
                onChange={(e) => {
                  handleEducation(e, index);
                  fetchDegrees(e.target.value, index);
                }}
                onFocus={() => setShowDegreeDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowDegreeDropdown(false), 200)
                }
              />
              {improve && hasErrors(index, "degree") && (
                <Button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                  onClick={() =>
                    setActiveTooltip(
                      activeTooltip === `degree-${index}`
                        ? null
                        : `degree-${index}`
                    )
                  }
                >
                  <AlertCircle className="w-5 h-5" />
                </Button>
              )}
              {renderTooltip(index, "degree", "Degree Suggestions")}

              {showDegreeDropdown && degreeSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md  shadow-lg">
                  {degreeSuggestions.map((degree, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => {
                        handleEducation(
                          { target: { name: "degree", value: degree } },
                          index
                        );
                        setShowDegreeDropdown(false);
                      }}
                    >
                      {degree}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative">
              {/* Start Date */}
              <label className="text-white">Start Date</label>
              <div className="flex flex-wrap gap-2 relative">
                <select
                  className={`border other-input flex-1 ${
                    improve && hasErrors(index, "startYear")
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={getDatePart(education.startYear, "month")}
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
                  value={getDatePart(education.startYear, "year")}
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
                          {getErrorMessage(index, "startYear").map((msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* End Date */}
              <label className="mt-4 block text-white">End Date</label>
              <div className="flex flex-wrap gap-2 relative">
                <select
                  className={`border other-input flex-1 ${
                    improve && hasErrors(index, "endYear")
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={getDatePart(education.endYear, "month")}
                  onChange={(e) => handleMonthChange(e, index, "endYear")}
                  disabled={education.endYear === "Present"}
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
                  value={getDatePart(education.endYear, "year")}
                  onChange={(e) => handleYearChange(e, index, "endYear")}
                  disabled={education.endYear === "Present"}
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
                    checked={education.endYear === "Present"}
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
                          {getErrorMessage(index, "endYear")?.map((msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="mt-2 text-white">Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  className={`w-full other-input border ${
                    improve && hasErrors(index, "location")
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={education.location}
                  onChange={(e) => handleEducation(e, index)}
                  onClick={(e) => e.stopPropagation()}
                />
                {isLoading.location && (
                  <div className="absolute right-8 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
                {improve && hasErrors(index, "location") && (
                  <Button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
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
              </div>

              {showLocationDropdown && locationSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {locationSuggestions.map((location, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                      onClick={() => selectLocation(location, index)}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}

              {renderTooltip(index, "location", "Location Suggestions")}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white my-2">
          No Education available. Add a new one to get started.
        </p>
      )}
      <FormButton
        size={resumeData.education.length}
        add={addEducation}
        remove={removeEducation}
      />
    </div>
  );
};

export default Education;
