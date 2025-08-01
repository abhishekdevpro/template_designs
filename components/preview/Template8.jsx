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
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper } from "./Common";
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
const Template8 = () => {
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
      <section className="flex justify-between">
        <aside
          className="w-4/12 bg-[#d4d4d8] p-4"
          style={{ backgroundColor: backgroundColorss }}
        >
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
          <header className=" pb-5 ">
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
        </div>
      </section>
    </div>
  );
};

export default Template8;
// import {useContext, useEffect, useRef} from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import ContactInfo from "./ContactInfo";
// import { CgWebsite } from "react-icons/cg";
// import DateRange from "../utility/DateRange";
// import Language from "./Language";
// import Skills from "./Skills";
// import Certification from "./Certification";
// import Link from "next/link";
// import {
//     FaGithub,
//     FaLinkedin,
//     FaTwitter,
//     FaFacebook,
//     FaInstagram,
//     FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
//     FaUnderline,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// import dynamic from "next/dynamic";
// import ContactAndSocialMedia from "./ContactAndSocial";
// import { SummaryWrapper, TextWrapper } from "./Common";
// import WorkExperience from "./WorkExperience";
// import ProjectsSection from "./ProjectSection";
// import { SkillsWrapper } from "./SkillWrapper";
// import EducationSection from "./Education";

// const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
// const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

// const Template8 = () => {
//   const { resumeData, setResumeData, headerColor, backgroundColorss  ,selectedFont } = useContext(ResumeContext);
//     const templateRef = useRef(null);

//     useEffect(() => {
//         if (templateRef.current) {
//             const height = templateRef.current.offsetHeight;
//             console.log('Template actual height:', height, 'pixels');

//             const computedStyle = window.getComputedStyle(templateRef.current);
//             const totalHeight = templateRef.current.getBoundingClientRect().height;

//             console.log('Template total height (including margins):', totalHeight, 'pixels');
//             console.log('Template computed style height:', computedStyle.height);
//         }
//     }, [resumeData]);

//     const extractHtml = () => {
//         const htmlContent = templateRef.current?.outerHTML;
//         console.log(htmlContent);
//         return htmlContent;
//     };

//     const icons = [
//         { name: "github", icon: <FaGithub /> },
//         { name: "linkedin", icon: <FaLinkedin /> },
//         { name: "twitter", icon: <FaTwitter /> },
//         { name: "facebook", icon: <FaFacebook /> },
//         { name: "instagram", icon: <FaInstagram /> },
//         { name: "youtube", icon: <FaYoutube /> },
//         { name: "website", icon: <CgWebsite /> },
//     ];

//     return (
//         <div ref={templateRef} className="">
//             <section className="flex justify-between">
//                 <aside className="w-4/12 bg-[#d4d4d8] p-4" style={{ backgroundColor: backgroundColorss }}>
//                     <div className="mb-5">
//                         <ContactAndSocialMedia
//                             title="Contacts"
//                             contactData={{
//                                 teldata: resumeData.contactInformation,
//                                 emaildata: resumeData.email,
//                                 addressdata: resumeData.address,
//                             }}
//                             socialMediaData={resumeData.socialMedia}
//                             icons={icons}
//                             layout="column"
//                             contactClass=""
//                             socialMediaClass=""
//                             textColor="text-white"
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <SkillsWrapper
//                             skills={resumeData.skills}
//                             headerColor={backgroundColorss ? "white" : "black"}
//                             droppableId="skills-section-1"
//                             className="mt-4"
//                             layout="column"
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <EducationSection
//                             itemClassNames={{
//                                 school: "",
//                                 degree: "",
//                                 location: "",
//                             }}
//                             layout="column"
//                             educationData={resumeData?.education}
//                             headerColor={backgroundColorss ? "white" : "black"}
//                         />
//                     </div>

//                     <div className="flex flex-col gap-2">
//                         <Language
//                             title="Languages"
//                             languages={resumeData.languages}
//                             headerColor={backgroundColorss ? "white" : "black"}
//                         />
//                         <Certification
//                             title="Certifications"
//                             certifications={resumeData.certifications}
//                             hasBullet={true}
//                             headerColor={backgroundColorss ? "white" : "black"}
//                         />
//                     </div>
//                 </aside>

//                 <div className="w-8/12 p-4">
//                     <header className="border-b-2 border-gray-200 pb-5 mb-5">
//                         <TextWrapper
//                             name={resumeData.name}
//                             position={resumeData.position}
//                             className="justify-start items-start"
//                             headerColor={backgroundColorss}
//                             orientation="column"
//                         />
//                         <SummaryWrapper
//                             summary={resumeData.summary}
//                             headerColor={"black"}
//                             editable={true}
//                             className="mt-4"
//                         />
//                     </header>

//                     <div className="relative">
//                         {/* Page break indicator styles */}
//                         <div className="absolute left-0 right-0 h-px bg-gray-300 border-t border-2 border-red-800"
//                              style={{ top: '1056px' }}>
//                             <div className="absolute -top-3 left-0 bg-white px-2 text-xs text-red-500">
//                                 Page 1
//                             </div>
//                         </div>
//                         <div className="absolute left-0 right-0 h-px bg-gray-300 border-t border-dashed border-gray-400"
//                              style={{ top: '2112px' }}>
//                             <div className="absolute -top-3 left-0 bg-white px-2 text-xs text-gray-500">
//                                 Page 2
//                             </div>
//                         </div>

//                         <WorkExperience
//                             itemClassNames={{
//                                 title: "text-lg font-bold mb-1 editable",
//                                 company: "",
//                                 position: "",
//                                 location: "",
//                             }}
//                             resumeData={resumeData}
//                             headerColor={backgroundColorss}
//                         />
//                         <ProjectsSection
//                             resumeData={resumeData}
//                             headerColor={backgroundColorss}
//                         />
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Template8;
