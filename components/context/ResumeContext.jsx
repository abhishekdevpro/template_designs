import React, { createContext, useState } from "react";
import DefaultResumeData from "../utility/DefaultResumeData";
import { compressImage } from "../utility/imageCompressor";
export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({});
  const [resumeStrength, setResumeStrength] = useState({});
  const [exp, setExp] = useState();
  const [headerColor, setHeaderColor] = useState("");
  const [backgroundColorss, setBgColor] = useState("");
  const [selectedFont, setSelectedFont] = useState("");

  // const handleProfilePicture = (e) => {
  //   const file = e.target.files[0];
  //   if (file instanceof Blob) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setResumeData({ ...resumeData, profilePicture: event.target.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      setResumeData({ ...resumeData, profilePicture: compressedBase64 });
    } catch (err) {
      alert("Image upload failed: " + err);
    }
  };
  const deleteProfilePicture = (e) => {
    e.preventDefault();
    setResumeData({ ...resumeData, profilePicture: "" });
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        handleProfilePicture,
        handleChange,
        headerColor,
        setHeaderColor,
        backgroundColorss,
        setBgColor,
        selectedFont,
        setSelectedFont,
        resumeStrength,
        setResumeStrength,
        deleteProfilePicture,
        exp,
        setExp,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
