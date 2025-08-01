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
const Template7 = () => {
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
      <div className="header text-start mb-6 mt-6">
        <div className="flex justify-center items-center gap-4">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
            />
          )}
          <div>
            <TextWrapper
              name={resumeData.name}
              position={resumeData.position}
              headerColor={backgroundColorss}
              orientation="column" // Use "column" for stacked layout
            />
          </div>
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
          className="justify-center gap-4 mt-4"
        />
      </div>
      <section className="flex justify-between">
        <aside
          className="w-4/12  p-4"
          style={{ backgroundColor: backgroundColorss }}
        >
          <div className="mb-5">
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={backgroundColorss ? "white" : "black"}
              droppableId="skills-section-1"
              className="mt-4"
              layout="column"
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

          <div className="flex flex-col gap-2">
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
        </aside>
        <div className="w-8/12 p-4">
          <header className="  pb-5">
            <SummaryWrapper
              summary={resumeData.summary}
              headerColor={"black"}
              editable={true} // Set to false if editing is not required
              className=""
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
        </div>
      </section>
    </div>
  );
};

export default Template7;
