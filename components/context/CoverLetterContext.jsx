import React, { createContext, useState } from "react";
import DefaultCoverLetterData from "../utility/DefaultCoverLetterData";
import { compressImage } from "../utility/imageCompressor";
export const CoverLetterContext = createContext();

export const CoverLetterProvider = ({ children }) => {
  const [coverLetterData, setCoverLetterData] = useState(
    DefaultCoverLetterData
  );
  const [headerColor, setHeaderColor] = useState("");
  const [backgroundColorss, setBgColor] = useState("");
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  // const[photo, setPhoto]= useState("")
  const handleChange = (e) => {
    setCoverLetterData({ ...coverLetterData, [e.target.name]: e.target.value });
  };
  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      setCoverLetterData({
        ...coverLetterData,
        photo: compressedBase64,
      });
    } catch (err) {
      alert("Image upload failed: " + err);
    }
  };
  const deleteProfilePicture = (e) => {
    e.preventDefault();
    setCoverLetterData({ ...coverLetterData, photo: "" });
  };

  return (
    <CoverLetterContext.Provider
      value={{
        deleteProfilePicture,
        handleProfilePicture,
        coverLetterData,
        setCoverLetterData,
        handleChange,
        headerColor,
        setHeaderColor,
        backgroundColorss,
        setBgColor,
        selectedFont,
        setSelectedFont,
        // photo,
        // setPhoto
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};
