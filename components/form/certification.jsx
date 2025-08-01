import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../context/ResumeContext";
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp, AlertCircle, X, Trash } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../buttonUIComponent";

const Certification = () => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const skillType = "certifications";
  const title = "Certifications";
  const router = useRouter();
  const { improve } = router.query;
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleSkills = (e, index, skillType) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [...resumeData[skillType], ""],
    });
  };

  const removeSkill = (index) => {
    // Check if this is the last skill entry
    if (resumeData[skillType].length <= 1) {
      toast.warn("At least one skill is required");

      return; // Don't remove if it's the last one
    }

    const newSkills = [...resumeData[skillType]];
    newSkills.splice(index, 1); // Changed from -1 to index to remove the specific skill

    // Clear any errors related to this index
    const updatedErrors = {};
    Object.keys(validationErrors).forEach((key) => {
      if (!key.startsWith(`${index}-`)) {
        updatedErrors[key] = validationErrors[key];
      }
    });
    // setValidationErrors(updatedErrors);

    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  // const deleteCertification = (indexToDelete) => {
  //   if (resumeData[skillType].length) {
  //     const newCertifications = resumeData[skillType].filter((_, index) => index !== indexToDelete);
  //     setResumeData({
  //       ...resumeData,
  //       [skillType]: newCertifications
  //     });
  //   }
  // };

  const deleteCertification = (indexToDelete) => {
    // Check if this is the last certification entry
    if (resumeData[skillType].length <= 1) {
      4;
      toast.warn("At least one certification is required");
      // setValidationErrors({
      //   ...validationErrors,
      //   general: "At least one certification is required"
      // });

      // // Clear the error message after 3 seconds
      // setTimeout(() => {
      //   const updatedErrors = {...validationErrors};
      //   delete updatedErrors.general;
      //   setValidationErrors(updatedErrors);
      // }, 3000);
      return; // Don't remove if it's the last one
    }

    // Only proceed with deletion if there's more than one certification
    const newCertifications = resumeData[skillType].filter(
      (_, index) => index !== indexToDelete
    );

    // Clear any errors related to this index
    // const updatedErrors = {};
    // Object.keys(validationErrors).forEach(key => {
    //   if (!key.startsWith(`${indexToDelete}-`)) {
    //     updatedErrors[key] = validationErrors[key];
    //   }
    // });
    // setValidationErrors(updatedErrors);

    setResumeData({
      ...resumeData,
      [skillType]: newCertifications,
    });
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.certifications_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.certifications_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  const selectSuggestion = (index, suggestion) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = suggestion;
    setResumeData({ ...resumeData, [skillType]: newSkills });
    setActiveTooltip(null);
  };

  return (
    <div className="flex-col flex gap-3 w-full  md:mt-10 md:px-10">
      <h2 className="input-title text-white  text-3xl">{title}</h2>
      {resumeData[skillType].map((skill, index) => (
        <div key={index} className="f-col justify-center">
          <div className="relative flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder={title}
              name={title}
              className={`w-full h-full px-4 py-2 rounded-md border  ${
                improve && hasErrors(index, "certifications")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={skill}
              onChange={(e) => handleSkills(e, index, skillType)}
            />
            <Button
              onClick={() => deleteCertification(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              type="button"
            >
              <Trash />
            </Button>
            {improve && hasErrors(index, "certifications") && (
              <Button
                type="button"
                className="absolute right-16 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `certifications-${index}`
                      ? null
                      : `certifications-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </Button>
            )}
            {activeTooltip === `certifications-${index}` && (
              <div className="absolute z-50 right-0 w-80 top-10 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Certifications Suggestion
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
                  {getErrorMessages(index, "certifications").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                  {/* Added Suggestions Section */}
                  {resumeStrength?.certifications_strenght?.[index]
                    ?.suggestions && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="font-medium text-black mb-2">
                        Suggestions:
                      </p>
                      {resumeStrength.certifications_strenght[
                        index
                      ].suggestions.map((suggestion, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => selectSuggestion(index, suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData[skillType].length}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Certification;
