// import { ResumeContext } from "../context/ResumeContext";
// import FormButton from "./FormButton";
// import React, { useContext, useState } from "react";
// import { AlertCircle, Trash, X } from "lucide-react";
// import { useRouter } from "next/router";

// const SOCIAL_MEDIA_OPTIONS = [
//   { name: "GitHub", baseUrl: "https://github.com/" },
//   { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
//   { name: "Twitter", baseUrl: "https://twitter.com/" },
//   { name: "Facebook", baseUrl: "https://facebook.com/" },
//   { name: "Instagram", baseUrl: "https://instagram.com/" },
//   { name: "Website", baseUrl: "https://" },
// ];

// // Maximum character length for social media handles/URLs
// const MAX_URL_LENGTH = 100;

// const SocialMedia = () => {
//   const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
//     useContext(ResumeContext);
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const router = useRouter();
//   const { improve } = router.query;

//   // Validate URL format
//   const isValidUrl = (url, platform) => {
//     // Find the platform to check its base URL
//     const platformOption = SOCIAL_MEDIA_OPTIONS.find(
//       (option) => option.name === platform
//     );

//     if (!platformOption) return false;

//     // Check if the URL starts with the correct base URL
//     const baseUrl = platformOption.baseUrl;
//     const fullUrl = url.startsWith("https://") ? url : `https://${url}`;

//     // For "Website", we only check if it's a valid URL format
//     if (platform === "Website") {
//       try {
//         new URL(fullUrl);
//         return true;
//       } catch (err) {
//         return false;
//       }
//     }

//     // For other platforms, check if it starts with the correct base URL
//     return fullUrl.startsWith(baseUrl) && fullUrl.length > baseUrl.length;
//   };

//   // Handle the changes in social media dropdown and URL input
//   const handleSocialMedia = (e, index) => {
//     const { name, value } = e.target;
//     const newSocialMedia = [...resumeData.socialMedia];

//     // Remove https:// prefix if present
//     const cleanValue = value.replace("https://", "");

//     // Check if URL exceeds max length
//     if (cleanValue.length > MAX_URL_LENGTH) {
//       setValidationErrors({
//         ...validationErrors,
//         [`${index}-${name}`]: `URL must be ${MAX_URL_LENGTH} characters or less`
//       });
//       return; // Don't update state if validation fails
//     }

//     // Validate URL format if platform is selected
//     if (name === "link" && newSocialMedia[index].socialMedia) {
//       const isValid = isValidUrl(cleanValue, newSocialMedia[index].socialMedia);

//       if (!isValid) {
//         setValidationErrors({
//           ...validationErrors,
//           [`${index}-${name}`]: `Please enter a valid ${newSocialMedia[index].socialMedia} URL`
//         });
//       } else {
//         // Clear error if URL is valid
//         const updatedErrors = {...validationErrors};
//         delete updatedErrors[`${index}-${name}`];
//         setValidationErrors(updatedErrors);
//       }
//     }

//     newSocialMedia[index][name] = cleanValue;
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   // Handle platform selection change and set default link
//   const handlePlatformChange = (index, platform) => {
//     const newSocialMedia = [...resumeData.socialMedia];

//     // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
//     const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
//       (option) => option.name === platform
//     );

//     // Check if the selectedPlatform exists before trying to access baseUrl
//     if (selectedPlatform) {
//       newSocialMedia[index].socialMedia = platform;
//       // Set the default link for selected platform
//       newSocialMedia[index].link = selectedPlatform.baseUrl.replace("https://", "");

//       // Clear any existing errors for this field
//       const updatedErrors = {...validationErrors};
//       delete updatedErrors[`${index}-link`];
//       setValidationErrors(updatedErrors);

//       setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//     } else {
//       console.error(
//         `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
//       );
//     }
//   };

//   // Add a new social media entry
//   const addSocialMedia = () => {
//     // Limit the number of social media entries to 5
//     if (resumeData.socialMedia.length >= 5) {
//       setValidationErrors({
//         ...validationErrors,
//         general: "Maximum of 5 social media profiles allowed"
//       });
//       setTimeout(() => {
//         const updatedErrors = {...validationErrors};
//         delete updatedErrors.general;
//         setValidationErrors(updatedErrors);
//       }, 3000);
//       return;
//     }

//     setResumeData({
//       ...resumeData,
//       socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
//     });
//   };

//   // Remove a social media entry
//   const removeSocialMedia = (index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia.splice(index, 1); // Remove the entry at the given index

//     // Clear any errors related to this index
//     const updatedErrors = {};
//     Object.keys(validationErrors).forEach(key => {
//       if (!key.startsWith(`${index}-`)) {
//         updatedErrors[key] = validationErrors[key];
//       }
//     });
//     setValidationErrors(updatedErrors);

//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   const hasErrors = (index, field) => {
//     // Check for both validation errors and resume strength errors
//     const validationError = validationErrors[`${index}-${field}`];

//     const workStrength = resumeStrength?.social_strenght?.[index];
//     const strengthError = workStrength &&
//       Array.isArray(workStrength[field]) &&
//       workStrength[field].length > 0;

//     return validationError || strengthError;
//   };

//   const getErrorMessages = (index, field) => {
//     // Get validation errors
//     const validationError = validationErrors[`${index}-${field}`];
//     const validationErrorArray = validationError ? [validationError] : [];

//     // Get resume strength errors
//     const workStrength = resumeStrength?.social_strenght?.[index];
//     const strengthErrors = workStrength && Array.isArray(workStrength[field])
//       ? workStrength[field]
//       : [];

//     // Combine both types of errors
//     return [...validationErrorArray, ...strengthErrors];
//   };

//   return (
//     <div className="flex flex-col w-full max-w-5xl mx-auto md:mt-10 md:px-10 rounded-lg shadow-md">
//       <div className="mb-6">
//         <h2 className="text-3xl font-bold text-white mb-2">Social Media</h2>

//         <p className="text-white text-lg">
//           Add your professional profiles to enhance your resume
//         </p>
//       </div>

//       {validationErrors.general && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
//           {validationErrors.general}
//         </div>
//       )}

//       <div className="space-y-4">
//         {resumeData.socialMedia?.map((socialMedia, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-center gap-3 w-full p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
//           >
//             <select
//               className="w-full md:w-1/3 px-4 py-3 rounded-md bg-white border border-gray-300 font-medium text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors"
//               value={socialMedia.socialMedia || ""}
//               onChange={(e) => handlePlatformChange(index, e.target.value)}
//             >
//               <option value="">Select Platform</option>
//               {SOCIAL_MEDIA_OPTIONS.map((option) => (
//                 <option key={option.name} value={option.name}>
//                   {option.name}
//                 </option>
//               ))}
//             </select>

//             {/* Input for the username or link */}
//             <div className="relative w-full md:w-2/3">
//               <input
//                 type="text"
//                 placeholder="Enter your profile link"
//                 name="link"
//                 className={`w-full px-4 py-3 rounded-md border ${
//                   (improve && hasErrors(index, "socialMedia")) || validationErrors[`${index}-link`]
//                     ? "border-red-500 focus:ring-red-200"
//                     : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                 } focus:ring-opacity-50 transition-colors`}
//                 value={socialMedia.link}
//                 onChange={(e) => handleSocialMedia(e, index)}
//                 maxLength={MAX_URL_LENGTH}
//               />
//               {((improve && hasErrors(index, "socialMedia")) || validationErrors[`${index}-link`]) && (
//                 <Button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                   onClick={() =>
//                     setActiveTooltip(
//                       activeTooltip === `socialMedia-${index}`
//                         ? null
//                         : `socialMedia-${index}`
//                     )
//                   }
//                 >
//                   <AlertCircle className="w-5 h-5" />
//                 </Button>
//               )}
//               {activeTooltip === `socialMedia-${index}` && (
//                 <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-200">
//                   <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <AlertCircle className="w-5 h-5 text-red-500" />
//                         <span className="font-medium text-gray-800">
//                           Improvement Suggestion
//                         </span>
//                       </div>
//                       <Button
//                         onClick={() => setActiveTooltip(null)}
//                         className="text-gray-500 hover:text-gray-700 transition-colors"
//                       >
//                         <X className="w-5 h-5" />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     {validationErrors[`${index}-link`] && (
//                       <div className="flex items-start space-x-3 mb-3">
//                         <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
//                         <p className="text-gray-700 text-sm">{validationErrors[`${index}-link`]}</p>
//                       </div>
//                     )}
//                     {improve && getErrorMessages(index, "socialMedia").map((msg, i) => (
//                       <div
//                         key={i}
//                         className="flex items-start space-x-3 mb-3 last:mb-0"
//                       >
//                         <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
//                         <p className="text-gray-700 text-sm">{msg}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <Button
//               type="button"
//               onClick={() => removeSocialMedia(index)}
//               aria-label="Remove"
//               className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors md:ml-2"
//             >
//               <Trash className="w-5 h-5" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-2">
//         <FormButton
//           size={resumeData.socialMedia.length}
//           add={addSocialMedia}
//           remove={removeSocialMedia}
//         />
//       </div>
//     </div>
//   );
// };

// export default SocialMedia;

import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { AlertCircle, Trash, X } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../buttonUIComponent";

const SOCIAL_MEDIA_OPTIONS = [
  { name: "GitHub", baseUrl: "https://github.com/" },
  { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { name: "Twitter", baseUrl: "https://twitter.com/" },
  { name: "Facebook", baseUrl: "https://facebook.com/" },
  { name: "Instagram", baseUrl: "https://instagram.com/" },
  { name: "Website", baseUrl: "https://" },
];

// Maximum character length for social media handles/URLs
const MAX_URL_LENGTH = 100;

const SocialMedia = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();
  const { improve } = router.query;

  // Validate URL format
  const isValidUrl = (url, platform) => {
    // Find the platform to check its base URL
    const platformOption = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.name === platform
    );

    if (!platformOption) return false;

    // Check if the URL starts with the correct base URL
    const baseUrl = platformOption.baseUrl;
    const fullUrl = url.startsWith("https://") ? url : `https://${url}`;

    // For "Website", we only check if it's a valid URL format
    if (platform === "Website") {
      try {
        new URL(fullUrl);
        return true;
      } catch (err) {
        return false;
      }
    }

    // For other platforms, check if it starts with the correct base URL
    return fullUrl.startsWith(baseUrl) && fullUrl.length > baseUrl.length;
  };

  // Handle the changes in social media dropdown and URL input
  const handleSocialMedia = (e, index) => {
    const { name, value } = e.target;
    const newSocialMedia = [...resumeData.socialMedia];

    // Remove https:// prefix if present
    const cleanValue = value.replace("https://", "");

    // Check if URL exceeds max length
    if (cleanValue.length > MAX_URL_LENGTH) {
      setValidationErrors({
        ...validationErrors,
        [`${index}-${name}`]: `URL must be ${MAX_URL_LENGTH} characters or less`,
      });
      return; // Don't update state if validation fails
    }

    // Validate URL format if platform is selected
    if (name === "link" && newSocialMedia[index].socialMedia) {
      const isValid = isValidUrl(cleanValue, newSocialMedia[index].socialMedia);

      if (!isValid) {
        setValidationErrors({
          ...validationErrors,
          [`${index}-${name}`]: `Please enter a valid ${newSocialMedia[index].socialMedia} URL`,
        });
      } else {
        // Clear error if URL is valid
        const updatedErrors = { ...validationErrors };
        delete updatedErrors[`${index}-${name}`];
        setValidationErrors(updatedErrors);
      }
    }

    newSocialMedia[index][name] = cleanValue;
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  // Handle platform selection change and set default link
  const handlePlatformChange = (index, platform) => {
    const newSocialMedia = [...resumeData.socialMedia];

    // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
    const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.name === platform
    );

    // Check if the selectedPlatform exists before trying to access baseUrl
    if (selectedPlatform) {
      newSocialMedia[index].socialMedia = platform;
      // Set the default link for selected platform
      newSocialMedia[index].link = selectedPlatform.baseUrl.replace(
        "https://",
        ""
      );

      // Clear any existing errors for this field
      const updatedErrors = { ...validationErrors };
      delete updatedErrors[`${index}-link`];
      setValidationErrors(updatedErrors);

      setResumeData({ ...resumeData, socialMedia: newSocialMedia });
    } else {
      console.error(
        `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
      );
    }
  };

  // Add a new social media entry
  const addSocialMedia = () => {
    // Limit the number of social media entries to 5
    if (resumeData.socialMedia.length >= 5) {
      setValidationErrors({
        ...validationErrors,
        general: "Maximum of 5 social media profiles allowed",
      });
      setTimeout(() => {
        const updatedErrors = { ...validationErrors };
        delete updatedErrors.general;
        setValidationErrors(updatedErrors);
      }, 3000);
      return;
    }

    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  // Remove a social media entry
  const removeSocialMedia = (index) => {
    // Check if this is the last social media entry
    if (resumeData.socialMedia.length <= 1) {
      toast.warn("At least one social media profile is required");

      setValidationErrors({
        ...validationErrors,
        general: "At least one social media profile is required",
      });

      // Clear the error message after 3 seconds
      setTimeout(() => {
        const updatedErrors = { ...validationErrors };
        delete updatedErrors.general;
        setValidationErrors(updatedErrors);
      }, 3000);
      return; // Don't remove if it's the last one
    }

    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.splice(index, 1); // Remove the entry at the given index

    // Clear any errors related to this index
    const updatedErrors = {};
    Object.keys(validationErrors).forEach((key) => {
      if (!key.startsWith(`${index}-`)) {
        updatedErrors[key] = validationErrors[key];
      }
    });
    setValidationErrors(updatedErrors);

    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const hasErrors = (index, field) => {
    // Check for both validation errors and resume strength errors
    const validationError = validationErrors[`${index}-${field}`];

    const workStrength = resumeStrength?.social_strenght?.[index];
    const strengthError =
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0;

    return validationError || strengthError;
  };

  const getErrorMessages = (index, field) => {
    // Get validation errors
    const validationError = validationErrors[`${index}-${field}`];
    const validationErrorArray = validationError ? [validationError] : [];

    // Get resume strength errors
    const workStrength = resumeStrength?.social_strenght?.[index];
    const strengthErrors =
      workStrength && Array.isArray(workStrength[field])
        ? workStrength[field]
        : [];

    // Combine both types of errors
    return [...validationErrorArray, ...strengthErrors];
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto md:mt-10 md:px-10 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Social Media</h2>

        <p className="text-white text-lg">
          Add your professional profiles to enhance your resume
        </p>
      </div>

      {/* {validationErrors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {validationErrors.general}
        </div>
      )} */}

      <div className="space-y-4">
        {resumeData.socialMedia?.map((socialMedia, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-3 w-full p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            <select
              className="w-full md:w-1/3 px-4 py-3 rounded-md bg-white border border-gray-300 font-medium text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors"
              value={socialMedia.socialMedia || ""}
              onChange={(e) => handlePlatformChange(index, e.target.value)}
            >
              <option value="">Select Platform</option>
              {SOCIAL_MEDIA_OPTIONS.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Input for the username or link */}
            <div className="relative w-full md:w-2/3">
              <input
                type="text"
                placeholder="Enter your profile link"
                name="link"
                className={`w-full px-4 py-3 rounded-md border ${
                  (improve && hasErrors(index, "socialMedia")) ||
                  validationErrors[`${index}-link`]
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                } focus:ring-opacity-50 transition-colors`}
                value={socialMedia.link}
                onChange={(e) => handleSocialMedia(e, index)}
                maxLength={MAX_URL_LENGTH}
              />
              {((improve && hasErrors(index, "socialMedia")) ||
                validationErrors[`${index}-link`]) && (
                <Button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                  onClick={() =>
                    setActiveTooltip(
                      activeTooltip === `socialMedia-${index}`
                        ? null
                        : `socialMedia-${index}`
                    )
                  }
                >
                  <AlertCircle className="w-5 h-5" />
                </Button>
              )}
              {activeTooltip === `socialMedia-${index}` && (
                <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-200">
                  <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-gray-800">
                          Improvement Suggestion
                        </span>
                      </div>
                      <Button
                        onClick={() => setActiveTooltip(null)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    {validationErrors[`${index}-link`] && (
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                        <p className="text-gray-700 text-sm">
                          {validationErrors[`${index}-link`]}
                        </p>
                      </div>
                    )}
                    {improve &&
                      getErrorMessages(index, "socialMedia").map((msg, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 mb-3 last:mb-0"
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                          <p className="text-gray-700 text-sm">{msg}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={() => removeSocialMedia(index)}
              aria-label="Remove"
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 transition-colors md:ml-2"
            >
              <Trash className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <FormButton
          size={resumeData.socialMedia.length}
          add={addSocialMedia}
          remove={removeSocialMedia}
        />
      </div>
    </div>
  );
};

export default SocialMedia;
