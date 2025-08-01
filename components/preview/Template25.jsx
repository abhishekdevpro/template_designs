// import React from "react";
import { useContext, useRef } from "react";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import { ResumeContext } from "../context/ResumeContext";

import EducationSection from "./Education";
import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
// Importing draggable components dynamically
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);
const Template25 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  return (
    <div className=" " style={{ fontFamily: `${selectedFont}` }}>
      <div class="text-left text-black w-full p-5">
        <div className="">
          {/* <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>CONTACT</h2> */}
          <ContactAndSocialMedia
            contactData={{
              teldata: resumeData.contactInformation,
              emaildata: resumeData.email,
              addressdata: resumeData.address,
            }}
            socialMediaData={resumeData.socialMedia}
            icons={icons}
            layout="row" // or "row"
            contactClass=""
            socialMediaClass=""
            className="items-start justify-start"
          />
        </div>
      </div>
      <div
        style={{ borderBottom: `2px solid ${backgroundColorss}` }}
        className={`mb-2 ${
          resumeData?.profilePicture
            ? "flex justify-between items-center"
            : "flex justify-center items-center "
        } px-16 py-4`}
      >
        <TextWrapper
          name={resumeData?.name}
          position={resumeData?.position}
          className={
            resumeData?.profilePicture
              ? "justify-start items-start"
              : "text-center"
          }
          headerColor={backgroundColorss}
          orientation="column"
        />
        {resumeData?.profilePicture && (
          <ImageWrapper
            src={resumeData.profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
        )}
      </div>
      <div className=" mx-auto flex">
        {/* Left Column */}
        <div className="left-column w-8/12 p-4 border-r border-gray-300">
          {/* Header Section with TextWrapper and conditional ImageWrapper */}

          {/* Rest of the left column content */}
          <div className="flex flex-col gap-4">
            <div className="col-span-2 space-y-2">
              <SummaryWrapper
                summary={resumeData.summary}
                headerColor={"black"}
                editable={true}
                className=""
              />
              <WorkExperience
                itemClassNames={{
                  title: "text-xl font-semibold mb-1 editable",
                  company: "",
                  position: "",
                  location: "",
                }}
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
              <ProjectsSection
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="right-column w-4/12 bg-gray-100 pl-4 pt-4"
          style={{ backgroundColor: backgroundColorss }}
        >
          <div className="flex flex-col gap-4">
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={backgroundColorss ? "white" : "black"}
              droppableId="skills-section-1"
              className="mt-4"
              layout="column"
            />
            <Language
              title="Languages"
              languages={resumeData.languages}
              headerColor={backgroundColorss ? "white" : "black"}
            />
            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
              hasBullet={true}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>

          <div className="education mb-8">
            <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="column"
              educationData={resumeData?.education}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Template25;
