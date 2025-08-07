"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Import all templates
import template1 from "../preview/template/template1.png";
import template2 from "../preview/template/template2.png";
import template3 from "../preview/template/template3.png";
import template4 from "../preview/template/template4.png";
import template5 from "../preview/template/template5.png";
import template6 from "../preview/template/template6.png";
import template7 from "../preview/template/template7.png";
import template8 from "../preview/template/template8.png";
import template9 from "../preview/template/template9.png";
import template10 from "../preview/template/template10.png";
import template11 from "../preview/template/template11.png";
import template12 from "../preview/template/template12.png";
import template13 from "../preview/template/template13.png";
import template14 from "../preview/template/template14.png";
import template15 from "../preview/template/template15.png";
import template16 from "../preview/template/template16.png";
import template17 from "../preview/template/template17.png";
import template18 from "../preview/template/template18.png";
import template19 from "../preview/template/template19.png";
import template20 from "../preview/template/template20.png";
import template21 from "../preview/template/template21.png";
import template22 from "../preview/template/template22.png";
import template23 from "../preview/template/template23.png";
import template24 from "../preview/template/template24.png";
import template25 from "../preview/template/template25.png";
import template26 from "../preview/template/template26.png";
import template27 from "../preview/template/template27.png";
import template28 from "../preview/template/template28.png";
import template29 from "../preview/template/template29.png";
import template30 from "../preview/template/template30.png";
import template31 from "../preview/template/template31.png";
import template32 from "../preview/template/template32.png";
import template33 from "../preview/template/template33.png";
import template34 from "../preview/template/template34.png";

import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";

const TemplateStep = ({ onNext, onBack, onChange, value }) => {
  const router = useRouter();
  const { resumeData, setResumeData, exp } = useContext(ResumeContext);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedHexCode, setSelectedHexCode] = useState("#2563EB");
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
      name: "Green",
      class: "bg-[#00b38d]",
      selectedClass: "ring-[#00b38d]",
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

  const templates = [
    {
      key: "template1",
      imageUrl: template1,
      name: "Modern Clean",
      // hasPhoto: true,
    },
    {
      key: "template2",
      imageUrl: template2,
      name: "Creative",
      // hasPhoto: false,
    },
    {
      key: "template3",
      imageUrl: template3,
      name: "Creative",
      // hasPhoto: false,
    },
    {
      key: "template4",
      imageUrl: template4,
      name: "Executive",
      // hasPhoto: false,
    },
    {
      key: "template5",
      imageUrl: template5,
      name: "Minimal",
      // hasPhoto: true
    },
    {
      key: "template6",
      imageUrl: template6,
      name: "Classic",
      // hasPhoto: false
    },
    {
      key: "template7",
      imageUrl: template7,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template8",
      imageUrl: template8,
      name: "Modern Clean",
      // hasPhoto: false,
    },
    {
      key: "template9",
      imageUrl: template9,
      name: "Creative",
      // hasPhoto: false,
    },
    {
      key: "template10",
      imageUrl: template10,
      name: "Executive",
      // hasPhoto: false,
    },
    {
      key: "template11",
      imageUrl: template11,
      name: "Minimal",
      //  hasPhoto: true
    },
    {
      key: "template12",
      imageUrl: template12,
      name: "Classic",
      //  hasPhoto: true
    },
    {
      key: "template13",
      imageUrl: template13,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template14",
      imageUrl: template14,
      name: "Contemporary",
      // hasPhoto: true,
    },
    {
      key: "template15",
      imageUrl: template15,
      name: "Modern Clean",
      // hasPhoto: false,
    },
    {
      key: "template16",
      imageUrl: template16,
      name: "Creative",
      // hasPhoto: true,
    },
    {
      key: "template17",
      imageUrl: template17,
      name: "Executive",
      // hasPhoto: true,
    },
    {
      key: "template18",
      imageUrl: template18,
      name: "Minimal",
      // hasPhoto: true
    },
    {
      key: "template19",
      imageUrl: template19,
      name: "Classic",
      // hasPhoto: false,
    },
    {
      key: "template20",
      imageUrl: template20,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template21",
      imageUrl: template21,
      name: "Contemporary",
      // hasPhoto: true,
    },
    {
      key: "template22",
      imageUrl: template22,
      name: "Modern Clean",
      // hasPhoto: false,
    },
    {
      key: "template23",
      imageUrl: template23,
      name: "Creative",
      // hasPhoto: true,
    },
    {
      key: "template24",
      imageUrl: template24,
      name: "Executive",
      // hasPhoto: true,
    },
    {
      key: "template25",
      imageUrl: template25,
      name: "Minimal",
      // hasPhoto: true
    },
    {
      key: "template26",
      imageUrl: template26,
      name: "Classic",
      // hasPhoto: false,
    },
    {
      key: "template27",
      imageUrl: template27,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template28",
      imageUrl: template28,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template29",
      imageUrl: template29,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template30",
      imageUrl: template30,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template31",
      imageUrl: template31,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template32",
      imageUrl: template32,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template33",
      imageUrl: template33,
      name: "Contemporary",
      // hasPhoto: false,
    },
    {
      key: "template34",
      imageUrl: template34,
      name: "Contemporary",
      // hasPhoto: false,
    }
  ];

  // Filter templates based on photo preference
  const filteredTemplates = templates.filter((template) => {
    if (value.hasPhoto === undefined) return true; // Show all templates if no filter selected
    return template.hasPhoto === value.hasPhoto;
  });

  // Set default color hex code if none selected
  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find((c) => c.name === "Navy Blue");
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  // Handle color selection with hex code
  const handleColorChange = (hexCode, colorName) => {
    setSelectedHexCode(hexCode);
    onChange({
      ...value,
      color: colorName,
      hexCode: hexCode,
    });
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = response.data.data.ai_resume_parse_data;
          setResumeData(parsedAIData.templateData);

          if (parsedAIData.templateData.templateDetails) {
            const backgroundColor =
              parsedAIData.templateData.templateDetails.backgroundColor;
            const colorObj =
              colors.find((c) => c.hexCode === backgroundColor) ||
              colors.find((c) => c.name === "Navy Blue");
            handleColorChange(colorObj.hexCode, colorObj.name);
          }

          // Set initial photo preference based on selected template
          if (parsedAIData.templateData.templateDetails?.templateId) {
            const selectedTemplate = templates.find(
              (t) =>
                t.key === parsedAIData.templateData.templateDetails.templateId
            );
            if (selectedTemplate) {
              onChange({ ...value, hasPhoto: selectedTemplate.hasPhoto });
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

  const handlePhotoPreferenceChange = (hasPhoto) => {
    // If current template doesn't match new photo preference, clear the selection
    const currentTemplate = templates.find((t) => t.key === value.template);
    if (currentTemplate && currentTemplate.hasPhoto !== hasPhoto) {
      onChange({ ...value, hasPhoto, template: undefined });
    } else {
      onChange({ ...value, hasPhoto });
    }
  };

  const formatResumeData = (data) => {
    return {
      name: data.name || "",
      position: data.position || "",
      contactInformation: data.contactInformation || "",
      email: data.email || "",
      address: data.address || "",
      profilePicture: value.hasPhoto ? data.profilePicture || "" : "", // Only include profile picture if hasPhoto is true
      socialMedia:
        data.socialMedia?.map((media) => ({
          socialMedia: media.socialMedia || "",
          link: media.link || "",
        })) || [],
      summary: data.summary || "",
      education:
        resumeData.education?.map((edu) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          startYear: edu.startYear,
          endYear: edu.endYear,
          location: edu.location || "",
        })) || [],
      workExperience:
        data.workExperience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          KeyAchievements: Array.isArray(exp.keyAchievements)
            ? exp.keyAchievements
            : [exp.keyAchievements || ""],
          startYear: exp.startYear || "",
          endYear: exp.endYear || "",
          location: exp.location,
        })) || [],
      projects:
        data.projects?.map((project) => ({
          title: project.title || "",
          link: project.link || "",
          description: project.description || "",
          keyAchievements: Array.isArray(project.keyAchievements)
            ? project.keyAchievements
            : [project.keyAchievements || ""],
          startYear: project.startYear || "",
          endYear: project.endYear || "",
          name: project.name || "",
        })) || [],
      skills: Array.isArray(data.skills)
        ? data.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || [],
          }))
        : [],
      languages: data.languages || [],
      certifications: data.certifications || [],
      templateDetails: {
        templateId: value.template,
        backgroundColor: selectedHexCode || "#2563EB",
        font: "Ubuntu",
      },
      no_of_experience: exp,
    };
  };

  const handleSaveTemplate = async () => {
    if (!resumeData) return;

    if (!value.template) {
      toast.error("Please select a template before proceeding");
      return;
    }

    const templateData = {
      templateData: formatResumeData(resumeData),
    };
    setIsLoading(true);
    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");
      if (!resumeId) {
        toast.error("Resume ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/resume-update/${resumeId}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        localStorage.setItem("isSaved", "true");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: "4px",
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`,
      };
    }
    return {
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: "none",
      ":hover": {
        boxShadow: `0 0 0 2px ${selectedHexCode}33`,
      },
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>
      {/* Top Bar */}
      <div className="text-center py-6">
        <h2 className="text-3xl md:text-4xl font-bold text-success hover:text-success/90 mb-4 ">
          Choose Your Perfect Template
        </h2>
        <p className="text-md md:text-lg text-success hover:text-success/90">
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

        {/* Templates */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <button
                key={template.key}
                onClick={() => onChange({ ...value, template: template.key })}
                className={`group relative bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-200 
                  ${
                    value.template === template.key
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                style={{
                  borderColor:
                    value.template === template.key
                      ? selectedHexCode
                      : undefined,
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={template.imageUrl}
                    alt={template.name}
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-200 group-hover:scale-105"
                    priority={templates.indexOf(template) < 6}
                  />
                  <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="bg-gradient-to-r from-[#002a48] via-primary to-success text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                      Use This Template
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky  bg-gradient-to-b from-white to-blue-100 bottom-0 p-4 flex justify-between items-center shadow-md px-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline text-base font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSaveTemplate}
          disabled={loading}
          style={{ backgroundColor: selectedHexCode }}
          className={`px-6 py-2 text-white rounded-xl font-semibold shadow-md transition-all
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {isLoading ? <SaveLoader loadingText="Saving" /> : "Choose Template"}
        </button>
      </div>
      {/* Bottom Bar */}
    </div>
  );
};

export default TemplateStep;
