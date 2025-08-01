// // import React from "react";
// import { useContext, useRef } from "react";
// // import { ResumeContext } from "../../pages/builder";
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
// const Template10 = () => {
//     const { resumeData, setResumeData, headerColor ,backgroundColorss} = useContext(ResumeContext);
//     const templateRef = useRef(null);

//   const extractHtml = () => {
//       const htmlContent = templateRef.current?.outerHTML;
//       console.log(htmlContent);
//       return htmlContent;
//   };
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
//         <div ref={templateRef} className="bg-gray-100">
//         <div className="max-w-4xl bg-white p-6 mx-auto shadow-md border-l-4 border-red-600" style={{ borderLeftColor: backgroundColorss }}>
//           <header className="text-center border-b-2 border-red-600 pb-3 mb-5" style={{ borderColor: backgroundColorss }}>
//             <h1 className="text-3xl text-gray-800 uppercase tracking-wider" style={{ color: headerColor }}>{resumeData.name}</h1>
//             <ContactAndSocialMedia
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
//             <p className="text-sm text-gray-500 text-center m-0">
//               {/* <ContactInfo
//                 mainclass="flex flex-row gap-1 justify-center items-center mb-1 "
//                 linkclass="inline-flex items-center gap-1"
//                 teldata={resumeData.contactInformation}
//                 emaildata={resumeData.email}
//                 addressdata={resumeData.address}
//                 telicon={<MdPhone />}
//                 emailicon={<MdEmail />}
//                 addressicon={<MdLocationOn />}
//               />
//                  <div className="flex gap-3 justify-center items-center">
//                 {Array.isArray(resumeData?.socialMedia) ? (
//                   resumeData.socialMedia.map((socialMedia, index) => {
//                     return (
//                       <a
//                         href={`http://${socialMedia.link}`}
//                         aria-label={socialMedia.socialMedia}
//                         key={index}
//                         title={socialMedia.socialMedia}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="lg:inline-flex items-center gap-1 social-media align-center justify-center "
//                         // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
//                         // wordWrap: "break-word" breaks the text onto the next line if it's too long,
//                         // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
//                       >
//                         {icons.map((icon, index) => {
//                           if (
//                             icon.name === socialMedia.socialMedia.toLowerCase()
//                           ) {
//                             return <span key={index}>{icon.icon}</span>;
//                           }
//                         })}
//                         {socialMedia.socialMedia}
//                       </a>
//                     );
//                   })
//                 ) : (
//                   <p>No social media links available</p> // Fallback content
//                 )}
//               </div> */}
//             </p>

//           </header>

//           <section className="mb-5">
//             <p className="text-sm text-gray-500 leading-relaxed hover:outline-dashed hover:outline-2 hover:outline-gray-400" contentEditable="true"
//                       suppressContentEditableWarning={true}>{resumeData.summary}</p>
//           </section>

//           <section className="mb-5">
//             <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Experience</h2>
//             <div className="mb-5">
//               {resumeData.workExperience.map((item, index) => (
//                 <div key={index} className="mb-7">
//                   <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                     {item.company}
//                   </h4>
//                   <p>{item.position}</p>
//                   <span className="text-sm text-gray-500 mb-3">
//                     <DateRange
//                       startYear={item.startYear}
//                       endYear={item.endYear}
//                       id={`work-experience-start-end-date`}
//                     />
//                   </span>

//                   <p className="text-sm hover:outline-dashed hover:outline-2 hover:outline-gray-400" contentEditable="true"
//                       suppressContentEditableWarning={true}>{item.description}</p>

//                   <Droppable
//                     droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                     type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                   >
//                     {(provided) => (
//                       <ul
//                         className="list-disc ul-padding pl-4 text-gray-500"
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                       >
//                         {typeof item.keyAchievements === "string" &&
//                           item.keyAchievements
//                             .split("\n")
//                             .map((achievement, subIndex) => (
//                               <Draggable
//                                 key={`${item.company}-${index}-${subIndex}`}
//                                 draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                 index={subIndex}
//                               >
//                                 {(provided, snapshot) => (
//                                   <li
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     className={` hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
//                         ${snapshot.isDragging &&
//                                       "outline-dashed outline-2 outline-gray-400 bg-white"}`}
//                                   >
//                                     <div
//                                       dangerouslySetInnerHTML={{ __html: achievement }}
//                                       contentEditable
//                                     />
//                                   </li>
//                                 )}
//                               </Draggable>
//                             ))}
//                         {provided.placeholder}
//                       </ul>
//                     )}
//                   </Droppable>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="mb-5">
//             <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Education</h2>
//             {resumeData.education.length > 0 && (
//               <div className="mb-1">
//                 {resumeData.education.map((item, index) => (
//                   <div key={index} className="mb-1 text-sm text-gray-500 font-semibold">
//                     <p className="text-md font-bold">{item.degree}</p>
//                     <p className="font-medium">{item.school}</p>
//                     <DateRange
//                       startYear={item.startYear}
//                       endYear={item.endYear}
//                       id={`education-start-end-date`}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//           </section>

//           <section>
//             <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Skills</h2>
//             <ul className="list-none pl-0 text-sm text-gray-500 leading-relaxed">
//               <Droppable droppableId="skills" type="SKILLS">
//                 {(provided) => (
//                   <div {...provided.droppableProps} ref={provided.innerRef}>
//                     {resumeData.skills.map((skill, index) => (
//                       <Draggable
//                         key={`SKILLS-${index}`}
//                         draggableId={`SKILLS-${index}`}
//                         index={index}
//                       >
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
//                               "  "
//                               }`}
//                           >
//                             <Skills title={skill.title} skills={skill.skills} />
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </ul>
//           </section>
//           <button onClick={extractHtml}>Log HTML Content</button>
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

// export default Template10;

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
const Template10 = () => {
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
        <TextWrapper
          name={resumeData.name}
          position={resumeData.position}
          headerColor={backgroundColorss}
          orientation="column" // Use "column" for stacked layout
        />
        <div className="mt-6">
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
        {resumeData.education.length > 0 && (
          <div className="mb-1">
            {/* <h2 className="text-lg font-bold mb-2.5 uppercase border-b border-black pb-0.5" style={{ color: headerColor }}>Education</h2> */}
            {/* {resumeData.education.map((item, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-end text-sm italic">
                <span>{item.startYear} - {item.endYear}</span>
              </div>
              <p className="font-semibold">{item.degree}</p>
              <p className="">{item.school}</p>
            </div>
          ))} */}
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

export default Template10;
