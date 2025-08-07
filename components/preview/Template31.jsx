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
import ContactAndSocialMedia2 from "./ContactAndSocial2";
import { SummaryWrapper, TextWrapper } from "./Common";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import { SkillsWrapper } from "./SkillWrapper";
//import EducationSection from "./Education";
import EducationSection1 from "./Education1";
// import { title } from "node:process";
// import { timeLog } from "node:console";
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
const Template31 = () => {
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
      <header className="p-4">
        <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
        <TextWrapper
          name={resumeData.name.toUpperCase()}
          position={resumeData.position.toUpperCase()}
          className="justify-center items-center"
          headerColor="white"
          orientation="column" // Use "column" for stacked layout
          positionclassName="text-white text-2xl mt-4"
          nameclassName = "!text-6xl"
        />
        </div>
        {/* <ContactAndSocialMedia
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
          className="items-center justify-center mt-6 mb-6"
        />
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true} // Set to false if editing is not required
          className="mt-4"
        /> */}
      </header>

      <section className="flex justify-between">
        <div className="w-8/12 p-4">
          <WorkExperience
            itemClassNames={{
              title: "text-lg font-bold mb-1 editable ",
              company: "",
              position: "",
              location: "",
            }}
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
          <EducationSection1
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="row"
              educationData={resumeData?.education}
              headerColor={"black"}
            />
          <ProjectsSection
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
        </div>
        <aside
          className="w-4/12 p-4 "
        //  style={{ backgroundColor: backgroundColorss }}
        >
            <ContactAndSocialMedia2
              title="Contacts"
              contactData={{
                teldata: resumeData.contactInformation,
                emaildata: resumeData.email,
                addressdata: resumeData.address,
              }}
              socialMediaData={resumeData.socialMedia}
              icons={icons}
              layout="column"
              contactClass=""
              socialMediaClass=""
              // textColor="text-white"
            />
            <div className="mt-3">
              <SummaryWrapper
                summary={resumeData.summary}
                // headerColor={"white"}
                editable={true}
                className=""
              />
            </div>
          <div className="mb-5">
            <Language
              title="Languages"
              languages={resumeData.languages}
              headerColor={backgroundColorss ? "black" : "white"}
            />
          </div>
          <div className="mb-5">
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={backgroundColorss}
              droppableId="skills-section-1"
              className="mt-4"
              textColor="black"
              layout="column"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
              hasBullet={true}
              headerColor={backgroundColorss ? "black" : "white"}
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Template31;
