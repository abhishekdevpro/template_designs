// import React from "react";
import { useContext, useEffect, useRef } from "react";
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
import ContactAndSocialMedia2 from "./ContactAndSocial";
import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common1";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import { SkillsWrapper } from "./SkillWrapper";
import EducationSection1 from "./Education1";
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
const Template45Jatin = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  const templateRef = useRef(null);
  useEffect(() => {
    if (templateRef.current) {
      const height = templateRef.current.offsetHeight;
      console.log("Template actual height:", height, "pixels");

      // Additional measurements if needed
      const computedStyle = window.getComputedStyle(templateRef.current);
      const totalHeight = templateRef.current.getBoundingClientRect().height;

      console.log(
        "Template total height (including margins):",
        totalHeight,
        "pixels"
      );
      console.log("Template computed style height:", computedStyle.height);
    }
  }, [resumeData]);

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
       {/* <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
        <div
          style={{ borderBottom: `2px solid ${backgroundColorss}` }}
          className={`mb-2 ${
            resumeData?.profilePicture
              ? "flex justify-start gap-4 items-center"
              : "flex justify-center items-center "
          } `}
        >
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
              borderColor="white"
            />
          )}
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            orientation="column" // Use "column" for stacked layout
            nameclassName="text-white"
            positionclassName="text-white"
          />
        </div>
      </div> */}
      <section className="flex justify-between">
        <aside
          className="w-4/12"
        //   style={{ backgroundColor: backgroundColorss }}
        >
            <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
        <div
          // style={{ borderBottom: `2px solid ${backgroundColorss}` }}
          className={`mb-2 relative  h-[86px] ${
            resumeData?.profilePicture
              ? "flex justify-start gap-4 items-center"
              : "flex justify-center items-center "
          } `}
        >
          {resumeData?.profilePicture && (
            <div className="absolute top-[50px] ml-[70px]">
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full flex"
              borderColor="white"
            />
            </div>
          )}
        </div>
      </div>
            <div className="p-4 mt-4">
            
          <div className="mb-5 mt-[70px]">
            <ContactAndSocialMedia2
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
              className=""
            //   textColor="text-white"
            />
          </div>

          <div className="mb-5">
            <SkillsWrapper
              skills={resumeData.skills}
            //   headerColor={backgroundColorss ? "white" : "black"}
              droppableId="skills-section-1"
              className="mt-4"
              textColor="black"
              layout="column"
            />
          </div>

          <div className="mb-5">
            <EducationSection1
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="column"
              educationData={resumeData?.education}
              headerColor={backgroundColorss ? "black" : "white"}
            />
          </div>

          {/* <div className="flex flex-col gap-2">
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
          </div> */}
          </div>
        </aside>
        <div className="w-8/12">
          <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
        <div
          style={{ borderBottom: `2px solid ${backgroundColorss}` }}
          className={`mb-2 relative h-[86px] ${
            resumeData?.profilePicture
              ? "flex justify-start gap-4 items-center"
              : "flex justify-center items-center "
          } `}
        >
            <div className="absolute top-[20px]">
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            orientation="column" // Use "column" for stacked layout
            nameclassName="text-white"
            positionclassName="text-white"
          />
          </div>
        </div>
      </div>
        <div className="p-4">

         
          <header className=" pb-5 ">
            {/* <TextWrapper
              name={resumeData.name}
              position={resumeData.position}
              className="justify-start items-start"
              headerColor={backgroundColorss}
              orientation="column" // Use "column" for stacked layout
            /> */}
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
        </div>
      </section>
    </div>
  );
};

export default Template45Jatin;