// // import React from "react";
// import { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import { HighlightMenu } from "react-highlight-menu";
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
//     FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
//     FaUnderline,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// import dynamic from "next/dynamic";
// import ContactAndSocialMedia from "./ContactAndSocial";
// // Importing draggable components dynamically
// const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
// const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
// const Template13 = () => {
//     const { resumeData, setResumeData, headerColor,backgroundColorss } = useContext(ResumeContext);
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
//         <div className="max-w-4xl mx-auto my-5 bg-white p-5 shadow-md">
//         <h1 className="text-4xl font-bold text-red-800 mb-2" style={{ color: headerColor }}>{resumeData.name}({resumeData.position})</h1>
//         <div className="text-sm mb-5">
//           <p>
//           <ContactAndSocialMedia
//       contactData={{
//         teldata: resumeData.contactInformation,
//         emaildata: resumeData.email,
//         addressdata: resumeData.address,
//       }}
//       socialMediaData={resumeData.socialMedia}
//       icons={icons}
//       layout="row" // or "row"
//       contactClass=""
//       socialMediaClass=""
//     />
//             {/* <a href="#" className="text-red-800 no-underline">Online Profile</a> */}
//           </p>
//         </div>

//         <div className="mb-5">
//           <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor ,borderColor: backgroundColorss}} >Professional Summary</div>
//           <p className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
//             contentEditable="true"
//             suppressContentEditableWarning={true}
//           >{resumeData.summary}</p>
//         </div>

//         <div className="mb-5">

//           <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor ,borderColor: backgroundColorss}}>Skills</div>
//           <ul className="list-disc ml-5">

//           <Droppable droppableId="skills" type="SKILLS">
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef}>
//                       {resumeData.skills.map((skill, index) => (
//                         <Draggable
//                           key={`SKILLS-${index}`}
//                           draggableId={`SKILLS-${index}`}
//                           index={index}
//                         >
//                           {(provided, snapshot) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
//                                 "outline-dashed outline-2 outline-gray-400 bg-white"
//                                 }`}
//                             >
//                               <Skills title={skill.title} skills={skill.skills} />
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>

//           </ul>
//         </div>

//         <div className="mb-5">
//           <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3"style={{ color: headerColor ,borderColor: backgroundColorss}}>Work History</div>
//           <div className="mb-5">
//           {resumeData.workExperience.length > 0 && (
//                   <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
//                     {(provided) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef}>

//                         {resumeData.workExperience.map((item, index) => (
//                           <Draggable
//                             key={`${item.company}-${index}`}
//                             draggableId={`WORK_EXPERIENCE-${index}`}
//                             index={index}
//                           >
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
//                                   "outline-dashed outline-2 outline-gray-400 bg-white"
//                                   }`}
//                               >
//                                 <div className="justify-between space-y-1">
//                                   <p className="font-semibold text-lg" style={{ fontSize: '1.3rem' }}>{item.company}</p>
//                                   <DateRange
//                                     startYear={item.startYear}
//                                     endYear={item.endYear}
//                                     id={`work-experience-start-end-date`}
//                                   />
//                                 </div>
//                                 <p className="font-medium">{item.position}</p>
//                                 <p
//                                 contentEditable="true"
//                                 suppressContentEditableWarning={true}
//                                 className=" text-sm hover:outline-dashed hover:outline-2 hover:outline-gray-400">
//                                   {item.description}
//                                 </p>
//                                 <Droppable
//                                   droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                                   type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                                 >
//                                   {(provided) => (
//                                     <ul
//                                       className="list-disc ul-padding pl-8"
//                                       {...provided.droppableProps}
//                                       ref={provided.innerRef}
//                                     >
//                                       {typeof item.keyAchievements === "string" &&
//                                         item.keyAchievements
//                                           .split("\n")
//                                           .map((achievement, subIndex) => (
//                                             <Draggable
//                                               key={`${item.company}-${index}-${subIndex}`}
//                                               draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                               index={subIndex}
//                                             >
//                                               {(provided, snapshot) => (
//                                                 <li
//                                                   ref={provided.innerRef}
//                                                   {...provided.draggableProps}
//                                                   {...provided.dragHandleProps}
//                                                   className={`
//                                           hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
//                                           ${snapshot.isDragging &&
//                                                     "outline-dashed outline-2 outline-gray-400 bg-white"
//                                                     }`}
//                                                 >
//                                                   <div
//                                                     dangerouslySetInnerHTML={{
//                                                       __html: achievement,
//                                                     }}
//                                                     contentEditable
//                                                   />
//                                                 </li>
//                                               )}
//                                             </Draggable>
//                                           ))}
//                                       {provided.placeholder}
//                                     </ul>
//                                   )}
//                                 </Droppable>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 )}
//                 {resumeData.projects.length > 0 && (
//                   <Droppable droppableId="projects" type="PROJECTS">
//                     {(provided) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef}>
//                         <h2
//                           className="txt-lg font-bold mb-1 border-b-2 border-gray-300 editable"
//                           contentEditable
//                           suppressContentEditableWarning
//                           style={{ color: headerColor }} >
//                           Projects
//                         </h2>
//                         {resumeData.projects.map((item, index) => (
//                           <Draggable
//                             key={`${item.name}-${index}`}
//                             draggableId={`PROJECTS-${index}`}
//                             index={index}
//                           >
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
//                                   "outline-dashed outline-2 outline-gray-400 bg-white"
//                                   }`}
//                               >
//                                 <div className="flex flex-row justify-between space-y-1">
//                                   <p className="text-lg font-bold">{item.name}</p>
//                                   <DateRange
//                                     startYear={item.startYear}
//                                     endYear={item.endYear}
//                                     id={`work-experience-start-end-date`}
//                                   />
//                                 </div>
//                                 <Link
//                                   href={item.link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="content"
//                                 >
//                                   {item.link}
//                                 </Link>
//                                 <p className="text-sm hover:outline-dashed hover:outline-2 hover:outline-gray-400">{item.description}</p>
//                                 <Droppable
//                                   droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
//                                   type="PROJECTS_KEY_ACHIEVEMENT"
//                                 >
//                                   {(provided) => (
//                                     <ul
//                                       className="list-disc ul-padding content"
//                                       {...provided.droppableProps}
//                                       ref={provided.innerRef}
//                                     >
//                                       {typeof item.keyAchievements === "string" &&
//                                         item.keyAchievements
//                                           .split("\n")
//                                           .map((achievement, subIndex) => (
//                                             <Draggable
//                                               key={`${item.name}-${index}-${subIndex}`}
//                                               draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                               index={subIndex}
//                                             >
//                                               {(provided, snapshot) => (
//                                                 <li
//                                                   ref={provided.innerRef}
//                                                   {...provided.draggableProps}
//                                                   {...provided.dragHandleProps}
//                                                   className={`
//                                           hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
//                                           ${snapshot.isDragging &&
//                                                     "outline-dashed outline-2 outline-gray-400 bg-white"
//                                                     }`}
//                                                 >
//                                                   <div
//                                                     dangerouslySetInnerHTML={{
//                                                       __html: achievement,
//                                                     }}
//                                                     contentEditable
//                                                   />
//                                                 </li>
//                                               )}
//                                             </Draggable>
//                                           ))}
//                                       {provided.placeholder}
//                                     </ul>
//                                   )}
//                                 </Droppable>
//                               </div>

//                             )}

//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 )}
//           </div>
//         </div>

//         <div className="mb-5">
//           <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Education</div>
//           <ul className="list-none">
//           {resumeData.education.length > 0 && (
//                     <div className="mb-1">
//                       {resumeData.education.map((item, index) => (
//                         <div  key={index} className="mb-1 text-lg">
//                           <p className="font-semibold text-md " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
//                           <p className="">{item.school}</p>
//                           <DateRange className="mb-1 text-lg"
//                             startYear={item.startYear}
//                             endYear={item.endYear}
//                             id={`education-start-end-date`}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//           </ul>
//         </div>

//         <div className="mb-5">
//           <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Languages/Certifications</div>
//           <Language  languages={resumeData.languages} />
//                 <Certification

//                   certifications={resumeData.certifications}
//                 />
//         </div>
//       </div>
//     );
// };

// const A4PageWrapper = ({ children }) => {
//     const alertA4Size = () => {
//         const preview = document.querySelector(".preview");
//         const previewHeight = preview.offsetHeight;
//         console.log(previewHeight);
//         if (previewHeight > 1122) {
//             alert("A4 size exceeded");
//         }
//     };

//     return (
//         <div className="w-8.5in border p-3" onLoad={alertA4Size}>
//             {children}
//         </div>
//     );

// };

// export default Template13;

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
const Template13 = () => {
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
      <div className="header text-start mb-6">
        <TextWrapper
          name={resumeData.name}
          position={resumeData.position}
          headerColor={backgroundColorss}
          orientation="column" // Use "column" for stacked layout
        />
        {/* <h1 className="text-2xl mb-1.5" style={{ color: headerColor }}>{resumeData.name}</h1> */}
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
          className="justify-start gap-4 mt-6"
        />
      </div>

      <SummaryWrapper
        summary={resumeData.summary}
        headerColor={"black"}
        editable={true} // Set to false if editing is not required
        className="mt-4"
      />
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
        {resumeData.education.length > 0 && (
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
        )}
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

export default Template13;
