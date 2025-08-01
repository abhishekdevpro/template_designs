import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import FormButton from "./FormButton";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ErrorPopup from "../utility/ErrorPopUp";
import Button from "../buttonUIComponent";

const Skill = ({ title, currentSkillIndex }) => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSkills, setAiSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });

  const router = useRouter();
  const { improve } = router.query;
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveInputIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query, index) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/skills-names?skill_keyword=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success" && response.data.data) {
        setSuggestions(response.data.data);
        setShowSuggestions(true);
        setActiveInputIndex(index);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSkill = (e, index, title) => {
    const value = e.target.value;

    // Update the skill value
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        ?.skills,
    ];
    newSkills[index] = value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));

    // Handle suggestions
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        fetchSuggestions(value, index);
      }, 300)
    );
  };

  const handleKeyDown = (e, index, title) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeSuggestionIndex], index, title);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveInputIndex(null);
    }
  };

  const handleSelectSuggestion = (suggestion, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        ?.skills,
    ];
    newSkills[index] = suggestion.name;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
    setShowSuggestions(false);
    setActiveInputIndex(null);
    setActiveSuggestionIndex(-1);
  };

  const hasErrors = (skillIndex) => {
    const skillStrengthErr =
      resumeStrength?.Skills_strenght?.[currentSkillIndex]
        ?.skills_strenght_info?.[skillIndex]?.skills;
    return (
      skillStrengthErr &&
      Array.isArray(skillStrengthErr) &&
      skillStrengthErr.length > 0
    );
  };

  const getErrorMessages = (skillIndex) => {
    const skillStrengthErr =
      resumeStrength?.Skills_strenght?.[currentSkillIndex]
        ?.skills_strenght_info?.[skillIndex]?.skills;
    return skillStrengthErr && Array.isArray(skillStrengthErr)
      ? skillStrengthErr
      : [];
  };

  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  // const removeSkill = (title, index) => {
  //   setResumeData((prevData) => {
  //     const skillType = prevData.skills.find(
  //       (skillType) => skillType.title === title
  //     );
  //     if (!skillType) return prevData;

  //     const newSkills = [...skillType.skills];
  //     newSkills.splice(index, 1);
  //     const updatedSkills = prevData.skills.map((skill) =>
  //       skill.title === title ? { ...skill, skills: newSkills } : skill
  //     );
  //     return {
  //       ...prevData,
  //       skills: updatedSkills,
  //     };
  //   });
  // };
  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      // Prevent removing the last skill if there's only one left
      if (skillType.skills.length <= 1) {
        toast.warn("At least one skill is required.");
        return prevData; // Prevent deletion
      }

      const newSkills = [...skillType.skills];
      newSkills.splice(index, 1); // Remove the skill at the specified index
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );

      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeAllSkills = (title) => {
    setResumeData((prevData) => {
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: [] } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setAiSkills([]);

    try {
      const token = localStorage.getItem("token");
      const skillType = resumeData.skills.find(
        (skillType) => skillType.title === title
      );

      if (!skillType || !skillType.skills.length) {
        setError("No skills found for this category.");
        return;
      }

      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/ai-skills-data",
        {
          key: "skills",
          keyword: title,
          content: resumeData.position || "Job Title",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        setAiSkills(response.data.data.resume_analysis.skills);
        setIsModalOpen(true);
      } else {
        setError("Unable to fetch AI data. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI skills data:", error);
      // toast.error(error.response?.data?.message || "Limit Exhausted");
      setErrorPopup({
        show: true,
        message:
          error.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching skills data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkills((prevSelectedSkills) => {
      if (prevSelectedSkills.includes(skill)) {
        return prevSelectedSkills.filter((s) => s !== skill);
      } else {
        return [...prevSelectedSkills, skill];
      }
    });
  };

  const addSelectedSkills = () => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ...selectedSkills];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
    setIsModalOpen(false);
    setSelectedSkills([]);
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  // if (!skillType || skillType.skills.length === 0) {
  //   return null;
  // }

  return (
    <div className="flex-col-gap-3 w-full md:mt-10 md:px-10">
      <h2 className="input-title text-white text-3xl py-2">{title}</h2>
      {skillType?.skills?.map((skill, index) => (
        <div key={index} className="relative flex items-center gap-2 space-x-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={title}
              name={title}
              className={`w-full other-input border ${
                improve && hasErrors(index) ? "border-red-500" : "border-black"
              }`}
              value={skill}
              onChange={(e) => handleSkill(e, index, title)}
              onKeyDown={(e) => handleKeyDown(e, index, title)}
              onFocus={() => {
                if (skill.length >= 2) {
                  fetchSuggestions(skill, index);
                }
              }}
            />
            {improve && hasErrors(index) && (
              <Button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `skill-${index}` ? null : `skill-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </Button>
            )}
            {showSuggestions &&
              activeInputIndex === index &&
              suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full bg-white mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, i) => (
                    <div
                      key={suggestion.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        i === activeSuggestionIndex ? "bg-gray-100" : ""
                      }`}
                      onClick={() =>
                        handleSelectSuggestion(suggestion, index, title)
                      }
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
          </div>

          <Button
            type="button"
            onClick={() => removeSkill(title, index)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            aria-label="Delete skill"
          >
            <Trash />
          </Button>

          {activeTooltip === `skill-${index}` && (
            <div className="absolute z-10 right-0 top-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-red-50 px-4 py-2 rounded-t-lg border-b border-red-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Skill Error</span>
                </div>
              </div>
              <div className="p-4">
                {getErrorMessages(index).map((msg, i) => (
                  <div key={i} className="text-gray-700 text-sm mb-2">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 p-3 flex justify-end">
                <Button
                  onClick={() => setActiveTooltip(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="flex space-x-4">
        <FormButton
          size={skillType.skills.length}
          add={() => addSkill(title)}
          remove={() => removeSkill(title)}
        />

        <Button
          type="button"
          onClick={handleAIAssist}
          className=" bg-black text-white px-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : " + Smart Assist"}
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl mb-4">Select AI Skills</h3>
            <ul className="space-y-2">
              {Array.isArray(aiSkills) && aiSkills.length > 0 ? (
                aiSkills.map((skill, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSelectSkill(skill)}
                    />
                    <span>{skill}</span>
                  </li>
                ))
              ) : (
                <li>No AI skills available.</li>
              )}
            </ul>
            <Button
              className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={addSelectedSkills}
            >
              Add Selected Skills
            </Button>
            <Button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedSkills([]);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {errorPopup.show && (
        <ErrorPopup
          message={errorPopup.message}
          onClose={() => setErrorPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

export default Skill;
