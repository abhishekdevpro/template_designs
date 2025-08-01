// import React from "react";
import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
// import Image from "next/image";
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
import { SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
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
const Template26 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  // const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
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
      <div className="mb-8 pt-2.5">
        <TextWrapper
          name={resumeData.name}
          position={resumeData.position}
          headerColor={backgroundColorss}
          orientation="column" // Use "column" for stacked layout
        />
      </div>
      <div className="mb-8">
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
      <div className="mb-5">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true} // Set to false if editing is not required
          className="mt-4"
        />
      </div>
      <div className="mb-8">
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={"black"}
          droppableId="skills-section-1"
          className="mt-2 flex flex-row justify-between"
          layout="col "
          textColor="black"
        />
      </div>
      <div class="mb-5">
        <WorkExperience
          itemClassNames={{
            title: "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
            company: "font-semibold",
            position: "",
            location: "",
          }}
          resumeData={resumeData}
          headerColor={backgroundColorss}
        />
        <div>
          <div class="mb-5">
            <ProjectsSection
              resumeData={resumeData}
              headerColor={backgroundColorss}
            />
          </div>
        </div>
      </div>
      <div className="mb-8 ">
        <EducationSection
          itemClassNames={{
            school: "text-gray-600",
            degree: "text-xl font-semibold text-gray-800",
            location: "text-gray-800",
          }}
          headerColor={backgroundColorss}
          educationData={resumeData?.education}
          layout="row"
        />
      </div>
      <div className="mb-8 ">
        <Certification
          title="Certifications"
          certifications={resumeData.certifications}
          hasBullet={true}
          headerColor={"black"}
        />
      </div>
      <div className="mb-8">
        <Language
          title="Languages"
          languages={resumeData.languages}
          headerColor={"black"}
        />
      </div>
    </div>
  );
};

export default Template26;
