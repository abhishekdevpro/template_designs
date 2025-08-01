// import React from "react";
import { useContext, useRef } from "react";
// import { ResumeContext } from "../../pages/builder";
import { ResumeContext } from "../context/ResumeContext";

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
import ContactAndSocialMedia from "./ContactAndSocial";
import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import { SkillsWrapper } from "./SkillWrapper";
import EducationSection from "./Education";
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
const Template16 = () => {
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
      <section className="flex justify-between">
        <aside
          className="w-4/12 bg-[#d4d4d8] p-4"
          style={{ backgroundColor: backgroundColorss }}
        >
          <div
            style={{ borderBottom: `2px solid ${backgroundColorss}` }}
            className={`mb-6 ${
              resumeData?.profilePicture
                ? "flex justify-between items-center"
                : "flex justify-center items-center "
            } px-16 py-4`}
          >
            {resumeData?.profilePicture && (
              <ImageWrapper
                src={resumeData.profilePicture}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full"
              />
            )}
          </div>
          <div className="mb-5">
            <ContactAndSocialMedia
              title="Contacts"
              contactData={{
                teldata: resumeData.contactInformation,
                emaildata: resumeData.email,
                addressdata: resumeData.address,
              }}
              socialMediaData={resumeData.socialMedia}
              icons={icons}
              layout="column" // or "row"
              contactClass=""
              socialMediaClass=""
              textColor="text-white"
            />
          </div>
          <div className="mb-5">
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
          <div className="mb-5">
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={backgroundColorss ? "white" : "black"}
              droppableId="skills-section-1"
              className="mt-4"
              layout="column"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Language
              title="Languages"
              languages={resumeData.languages}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </aside>
        <div className="w-8/12 p-4">
          <header className=" border-b-2 border-gray-200 pb-5 mb-5">
            <TextWrapper
              name={resumeData.name}
              position={resumeData.position}
              className="justify-start items-start"
              headerColor={backgroundColorss}
              orientation="column" // Use "column" for stacked layout
            />
            <SummaryWrapper
              summary={resumeData.summary}
              headerColor={"black"}
              editable={true} // Set to false if editing is not required
              className="mt-4"
            />
          </header>
          <WorkExperience
            itemClassNames={{
              title: "text-lg font-bold mb-1  editable",
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
          <Certification
            title="Certifications"
            certifications={resumeData.certifications}
            hasBullet={true}
            headerColor={backgroundColorss ? "black" : "white"}
          />
        </div>
      </section>
    </div>
  );
};

export default Template16;
