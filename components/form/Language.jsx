import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../context/ResumeContext";
import { useRouter } from "next/router";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Trash,
  Globe2,
} from "lucide-react";
import { toast } from "react-toastify";
import Button from "../buttonUIComponent";

const Language = () => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const skillType = "languages";
  const title = "Languages";

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin Chinese",
    "Japanese",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Russian",
    "Italian",
    "Korean",
    "Other",
  ];

  const proficiencyOptions = [
    "Native Speaker",
    "Fluent",
    "Good ",
    "Basic Knowledge",
    "Just Starting",
  ];

  const router = useRouter();
  const { improve } = router.query;
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleSkills = (e, index, field) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = { ...newSkills[index], [field]: e.target.value };
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [
        ...(resumeData[skillType] || []),
        { language: "", proficiency: "" },
      ],
    });
  };

  const removeSkill = () => {
    const newSkills = [...(resumeData[skillType] || [])];
    newSkills.pop();
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const deleteLanguage = (indexToDelete) => {
    if (resumeData[skillType]?.length > 1) {
      const newLanguages = resumeData[skillType].filter(
        (_, index) => index !== indexToDelete
      );
      setResumeData({
        ...resumeData,
        [skillType]: newLanguages,
      });
    } else {
      toast.warn("At least one language is required.");
    }
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.languages_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.languages_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  return (
    <div className="flex-col-gap-3 w-full md:mt-10 md:px-10">
      <div className="flex items-center gap-3 mb-4">
        {/* <Globe2 className="w-8 h-8 text-white" /> */}
        <h2 className="input-title text-white text-3xl">{title}</h2>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        If you are proficient in one or more languages, mention them in this
        section.
      </p>

      {resumeData[skillType]?.length > 0 ? (
        resumeData[skillType].map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-2 mb-6 shadow-md border border-gray-300"
          >
            <div className="flex flex-wrap md:flex-nowrap justify-between items-end gap-6 ">
              {/* Language Selection */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    {index === 0 ? "First Language" : "Language"}
                  </label>
                  <select
                    className={`w-full border rounded-md p-2 transition-all duration-200 focus:ring-2 ${
                      improve && hasErrors(index, "language")
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-400 focus:ring-blue-500"
                    }`}
                    value={skill.language}
                    onChange={(e) => handleSkills(e, index, "language")}
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    {languageOptions.map((lang, i) => (
                      <option key={i} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>

                  {/* Error Tooltip */}
                  {improve && hasErrors(index, "language") && (
                    <Button
                      type="button"
                      className="absolute right-3 top-[55%] -translate-y-1/2 text-red-500 hover:text-red-600 transition"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `language-${index}`
                            ? null
                            : `language-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </Button>
                  )}

                  {activeTooltip === `language-${index}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-300">
                      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-gray-800">
                            Language Suggestion
                          </span>
                        </div>
                        <Button
                          onClick={() => setActiveTooltip(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(index, "language").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-2 last:mb-0"
                          >
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                            <p className="text-sm text-gray-700">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Proficiency Selection */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Proficiency
                </label>
                <select
                  className="w-full border border-gray-400 rounded-md p-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  value={skill.proficiency}
                  onChange={(e) => handleSkills(e, index, "proficiency")}
                >
                  <option value="" disabled>
                    Select Proficiency
                  </option>
                  {index === 0 ? (
                    <option value="Native Speaker">Native Speaker</option>
                  ) : (
                    proficiencyOptions.map((level, i) => (
                      <option key={i} value={level}>
                        {level}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Delete Button */}
              <Button
                onClick={() => deleteLanguage(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all flex items-center justify-center"
                type="button"
                title="Delete language"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-black my-2">
          No languages added. Add a new language to get started.
        </p>
      )}
      <FormButton
        size={resumeData[skillType]?.length || 0}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Language;
