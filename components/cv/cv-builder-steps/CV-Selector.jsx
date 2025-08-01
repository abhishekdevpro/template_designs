"use client";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import cvletter1 from "../coverletter/cvimgs/cvletter1.png";
import cvletter2 from "../coverletter/cvimgs/cvletter2.png";
import cvletter3 from "../coverletter/cvimgs/cvletter3.png";
import cvletter4 from "../coverletter/cvimgs/cvletter4.png";
import cvletter5 from "../coverletter/cvimgs/cvletter5.png";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import { SaveLoader } from "../../ResumeLoader/SaveLoader";
const CVSelector = ({ onNext, onBack, onChange, value }) => {
  const [selectedHexCode, setSelectedHexCode] = useState("#2563EB");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [coverLetterData, setCoverLetterData] = useState(null);
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const colors = [
    {
      name: "Black",
      class: "bg-black",
      selectedClass: "ring-black",
      hexCode: "#000000",
    },
    {
      name: "Navy Blue",
      class: "bg-blue-900",
      selectedClass: "ring-blue-900",
      hexCode: "#00008B",
    },
    {
      name: "Dark Gray",
      class: "bg-gray-800",
      selectedClass: "ring-gray-800",
      hexCode: "#333333",
    },
    {
      name: "Purple",
      class: "bg-purple-700",
      selectedClass: "ring-purple-700",
      hexCode: "#6A0DAD",
    },
    {
      name: "Brown",
      class: "bg-[#8B3A3A]",
      selectedClass: "ring-[#8B3A3A]",
      hexCode: "#8B3A3A",
    },
    {
      name: "Periwinkle",
      class: "bg-[#6666FF]",
      selectedClass: "ring-[#6666FF]",
      hexCode: "#6666FF",
    },

    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-600",
      hexCode: "#FF0000",
    },
    {
      name: "Teal Green",
      class: "bg-[#3B8070]",
      selectedClass: "ring-[#3B8070]",
      hexCode: "#3B8070",
    },
    {
      name: "Slate Gray",
      class: "bg-gray-600",
      selectedClass: "ring-gray-600",
      hexCode: "#666666",
    },
    {
      name: "Olive",
      class: "bg-[#999900]",
      selectedClass: "ring-[#999900]",
      hexCode: "#999900",
    },
    {
      name: "Orange Red",
      class: "bg-[#F2542D]",
      selectedClass: "ring-[#F2542D]",
      hexCode: "#F2542D",
    },
    {
      name: "Bright Blue",
      class: "bg-[#3399FF]",
      selectedClass: "ring-[#3399FF]",
      hexCode: "#3399FF",
    },

    {
      name: "Coral Pink",
      class: "bg-[#F88379]",
      selectedClass: "ring-[#F88379]",
      hexCode: "#F88379",
    },
    {
      name: "Brown Orange",
      class: "bg-[#D2691E]",
      selectedClass: "ring-[#D2691E]",
      hexCode: "#D2691E",
    },
    {
      name: "Lavender Pink",
      class: "bg-[#DA70D6]",
      selectedClass: "ring-[#DA70D6]",
      hexCode: "#DA70D6",
    },
    {
      name: "Steel Blue",
      class: "bg-[#6A7BA2]",
      selectedClass: "ring-[#6A7BA2]",
      hexCode: "#6A7BA2",
    },
    {
      name: "Light Coral",
      class: "bg-[#F08080]",
      selectedClass: "ring-[#F08080]",
      hexCode: "#F08080",
    },
    {
      name: "Bright Orange",
      class: "bg-[#FFA500]",
      selectedClass: "ring-[#FFA500]",
      hexCode: "#FFA500",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      hexCode: "#6D7278",
    },
    {
      name: "Charcoal Gray",
      class: "bg-[#374151]",
      selectedClass: "ring-[#4B5563]",
      hexCode: "#374151",
    },
    {
      name: "Blue",
      class: "bg-[#00b38d]",
      selectedClass: "ring-blue-400",
      hexCode: "#00b38d",
    },
    {
      name: "Navy Blue",
      class: "bg-[#1E3A8A]",
      selectedClass: "ring-[#1E3A8A]",
      hexCode: "#1E3A8A",
    },
    {
      name: "Slate Blue",
      class: "bg-[#475569]",
      selectedClass: "ring-[#64748B]",
      hexCode: "#475569",
    },
    {
      name: "Purple",
      class: "bg-purple-600",
      selectedClass: "ring-purple-400",
      hexCode: "#9333EA",
    },
    {
      name: "Classic Blue",
      class: "bg-[#2563EB]",
      selectedClass: "ring-[#3B82F6]",
      hexCode: "#2563EB",
    },
    {
      name: "Forest Green",
      class: "bg-[#166534]",
      selectedClass: "ring-[#22C55E]",
      hexCode: "#166534",
    },
    {
      name: "Deep Teal",
      class: "bg-[#0F766E]",
      selectedClass: "ring-[#0D9488]",
      hexCode: "#0F766E",
    },
    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-400",
      hexCode: "#DC2626",
    },
    {
      name: "Yellow",
      class: "bg-yellow-500",
      selectedClass: "ring-yellow-400",
      hexCode: "#EAB308",
    },
    {
      name: "Pink",
      class: "bg-pink-500",
      selectedClass: "ring-pink-400",
      hexCode: "#EC4899",
    },
    {
      name: "Teal",
      class: "bg-teal-500",
      selectedClass: "ring-teal-400",
      hexCode: "#14B8A6",
    },
    {
      name: "Orange",
      class: "bg-orange-500",
      selectedClass: "ring-orange-400",
      hexCode: "#F97316",
    },
    {
      name: "Indigo",
      class: "bg-indigo-600",
      selectedClass: "ring-indigo-400",
      hexCode: "#4F46E5",
    },
  ];

  const cvTemplates = [
    {
      key: "template1",
      imageUrl: cvletter1,
      name: "Professional CV",
      hasPhoto: true,
    },
    {
      key: "template2",
      imageUrl: cvletter2,
      name: "Creative CV",
      hasPhoto: false,
    },
    {
      key: "template3",
      imageUrl: cvletter3,
      name: "Academic CV",
      hasPhoto: false,
    },
    {
      key: "template4",
      imageUrl: cvletter4,
      name: "Executive CV",
      hasPhoto: false,
    },
    {
      key: "template5",
      imageUrl: cvletter5,
      name: "Technical CV",
      hasPhoto: true,
    },
  ];

  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find((c) => c.name === "Blue");
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  const handleColorChange = (hexCode, colorName) => {
    setSelectedHexCode(hexCode);
    onChange({
      ...value,
      color: colorName,
      hexCode: hexCode,
    });
  };
  // console.log(coverLetterData, ">>>>coverletterdata");
  const handleTemplateSelect = (template) => {
    onChange({
      ...value,
      template: template.key,
      // category: template.category,
      style: template.style,
    });
  };
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const coverletterId = router.query.id || localStorage.getItem("id");
        if (!coverletterId || !token) {
          toast.error("Cover Letter ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/coverletter/${coverletterId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = response.data.data.cover_letter_obj;
          setCoverLetterData(parsedAIData.coverletterInfo);

          if (parsedAIData.coverletterInfo.templateDetails) {
            const backgroundColor =
              parsedAIData.coverletterInfo.templateDetails.backgroundColor;
            const colorObj =
              colors.find((c) => c.hexCode === backgroundColor) ||
              colors.find((c) => c.name === "Blue");
            handleColorChange(colorObj.hexCode, colorObj.name);
          }

          // Set initial photo preference based on selected template
          if (parsedAIData.coverletterInfo.templateDetails?.templateId) {
            const selectedTemplate = cvTemplates.find(
              (t) =>
                t.key ===
                parsedAIData.coverletterInfo.templateDetails.templateId
            );
            if (selectedTemplate) {
              onChange({ ...value });
            }
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatCoverLetterData = (data) => {
    console.log(data, ">>>data");
    return {
      closing: data.closing || "",
      body: data.body || "",
      gratitude: data.gratitude || "",
      introduction: data.introduction || "",
      letterDetails: {
        companyName: data.letterDetails?.companyName || "",
        date: data.letterDetails?.date || "",
        jobTitle: data.letterDetails?.jobTitle || "",
        reference: data.letterDetails?.reference || "",
        salutation: data.letterDetails?.salutation || "",
      },

      signature: data.signature || "",
      templateDetails: {
        templateId: value.template,
        backgroundColor: selectedHexCode || "#2563EB",
        font: "Ubuntu",
      },
      personalDetails: {
        name: data.personalDetails?.name || "",
        position: data.personalDetails?.position || "",
        address: data.personalDetails?.address || "",
        email: data.personalDetails?.email || "",
        contact: data.personalDetails?.contact || "",
        photo: data.photo,
      },
    };
  };

  const handleSaveSelection = async () => {
    if (!coverLetterData) return;
    const coverletterInfo = {
      coverletterInfo: formatCoverLetterData(coverLetterData),
    };
    console.log(coverLetterData, ">>>coverlettersdata");
    if (!value.template) {
      toast.error("Please select a CV template before proceeding");
      return;
    }
    setIsLoading(true);
    try {
      const coverletterId = router.query.id || localStorage.getItem("id");
      if (!coverletterId) {
        toast.error("Resume ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/coverletter/${coverletterId}`,
        coverletterInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        // setIsSaved(true);
        // localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
        onNext();
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: "4px",
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`,
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <div className="bg-primary text-white py-3 px-6 rounded-b-3xl mx-auto mt-4   items-center gap-3 shadow-md">
        <h2 className="text-3xl font-bold text-white">
          Choose Your Perfect Cover Letter
        </h2>
        <p className="text-lg text-white mt-2">
          Select a design that best represents your professional style
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 py-10 flex-1 overflow-hidden">
        {/* Sidebar - Color Theme */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10 w-full lg:max-w-[250px]">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Color Theme
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`
                  w-8 h-8 rounded-full ${color.class}
                  transform hover:scale-110 transition-all duration-200
                  ${
                    selectedHexCode === color.hexCode
                      ? `ring-2 ring-offset-2 ${color.selectedClass}`
                      : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                  }
                `}
                onClick={() => handleColorChange(color.hexCode, color.name)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cvTemplates
              // .filter((t) => !value.category || t.category === value.category)
              .map((template) => (
                <button
                  key={template.key}
                  onClick={() => handleTemplateSelect(template)}
                  className="group bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-200 "
                  style={getHoverStyle(template.key)}
                >
                  <div className="">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={template.imageUrl}
                        alt={template.name}
                        layout="fill"
                        objectFit="contain"
                        className="transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-medium text-lg">
                          {template.name}
                        </p>
                        <p className="text-white/80 text-sm">
                          {template.description}
                        </p>
                      </div> */}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-md px-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline text-base font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSaveSelection}
          disabled={loading}
          style={{ backgroundColor: selectedHexCode }}
          className={`px-6 py-2 text-white rounded-xl font-semibold shadow-md transition-all
                    ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
        >
          {isLoading ? (
            <SaveLoader loadingText="Saving" />
          ) : (
            "Choose Cover Letter"
          )}
        </button>
      </div>
    </div>
  );
};

export default CVSelector;
