// import React from "react";
import { useContext, useRef } from "react";
// import { ResumeContext } from "../../pages/builder";
import { ResumeContext } from "../context/ResumeContext";

import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Image from "next/image";
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
import Link from "next/link";
import ContactAndSocialMedia from "./ContactAndSocial";

import EducationSection from "./Education";

import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
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
const Template5 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };
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
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div className="header text-center mb-6">
        <div className="flex justify-center items-center mb-4">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
            />
          )}
        </div>
        <div className="mb-4">
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            headerColor={backgroundColorss}
            orientation="column" // Use "column" for stacked layout
          />
        </div>

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
          className="justify-center gap-4"
        />
      </div>

      <SummaryWrapper
        summary={resumeData.summary}
        headerColor={"black"}
        editable={true} // Set to false if editing is not required
        className="mt-4"
      />

      <section className="experience mb-6">
        {/* <h2 className="text-lg font-bold mb-2.5 uppercase border-b border-black pb-0.5 " style={{ color: headerColor }}>Professional Experience</h2> */}

        <div className="col-span-2 space-y-2">
          <WorkExperience
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
              company: "font-semibold",
              position: "content",
              location: "sub-content",
            }}
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
          <ProjectsSection
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
        </div>
      </section>

      <section className="education mb-6">
        {
          <div className="mb-1">
            <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="row"
              educationData={resumeData?.education}
              headerColor={backgroundColorss}
            />
          </div>
        }
      </section>

      <section className="skills mb-6">
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={backgroundColorss}
          droppableId="skills-section-1"
          className="mt-4"
          layout="row"
          textColor="black"
        />
      </section>
      <section className="certification mb-6">
        <Certification
          title="Certifications"
          certifications={resumeData.certifications}
          hasBullet={false}
          headerColor={"black"}
        />
      </section>
      <section className="language mb-6">
        <Language
          title="Languages"
          languages={resumeData.languages}
          headerColor={"black"}
        />
      </section>
    </div>
  );
};

export default Template5;
