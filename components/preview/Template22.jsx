// import { useContext, useRef } from "react";
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
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// import dynamic from "next/dynamic";
// import ContactAndSocialMedia from "./ContactAndSocial";

// // Importing draggable components dynamically
// const DragDropContext = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
//   { ssr: false }
// );
// const Droppable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
//   { ssr: false }
// );
// const Draggable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
//   { ssr: false }
// );

// const Template22 = () => {
//   const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
//   const icons = [
//     { name: "github", icon: <FaGithub /> },
//     { name: "linkedin", icon: <FaLinkedin /> },
//     { name: "twitter", icon: <FaTwitter /> },
//     { name: "facebook", icon: <FaFacebook /> },
//     { name: "instagram", icon: <FaInstagram /> },
//     { name: "youtube", icon: <FaYoutube /> },
//     { name: "website", icon: <CgWebsite /> },
//   ];
//   const templateRef = useRef(null);

//   const extractHtml = () => {
//     const htmlContent = templateRef.current?.outerHTML;
//     console.log(htmlContent);
//     return htmlContent;
//   };

//   return (
//     <div ref={templateRef} className="max-w-3xl mx-auto p-5 bg-white shadow-md">
//       <div>
//         <div className="flex mb-5">
//           <div className="ml-5 p-5">
//             <img
//               className="rounded-full"
//               src={
//                 resumeData.profilePicture
//                   ? resumeData.profilePicture
//                   : "img/profile_one.png"
//               }
//               alt="Profile"
//             />
//           </div>
//           <div className="p-5">
//             <h1
//               className="text-4xl font-bold mb-2 text-blue-900"
//               style={{ color: headerColor }}
//             >
//               {resumeData.name}
//             </h1>
//             <h2
//               className="text-2xl font-semibold mb-2 text-black"
//               style={{ color: headerColor }}
//             >
//               {resumeData.position}
//             </h2>

//             <div className="text-left text-black">
//               <div className="mb-8">
//                 <ContactAndSocialMedia
//                   contactData={{
//                     teldata: resumeData.contactInformation,
//                     emaildata: resumeData.email,
//                     addressdata: resumeData.address,
//                   }}
//                   socialMediaData={resumeData.socialMedia}
//                   icons={icons}
//                   layout="row" // or "row"
//                   contactClass=""
//                   socialMediaClass=""
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-5">
//           <div className="flex">
//             <h2
//               className="text-xl text-blue-900 font-bold mb-2"
//               style={{ color: headerColor }}
//             >
//               ABOUT ME
//             </h2>
//           </div>
//           <div className="border-b-2 border-blue-900 mb-2 mt-2"></div>
//           <p
//             contentEditable="true"
//             suppressContentEditableWarning={true}
//             className="text-sm text-black tracking-wide hover:outline-dashed hover:outline-2 hover:outline-gray-400"
//           >
//             {resumeData.summary}
//           </p>
//         </div>
//         <div className="p-5">
//           <h2
//             className="text-xl text-blue-900 font-bold mb-4"
//             style={{ color: headerColor }}
//           >
//             EXPERIENCE
//           </h2>
//           <div>
//             <h3
//               className="text-xl text-blue-900 font-semibold border-b-2 border-blue-900 pb-2 mb-4"
//               style={{ color: headerColor }}
//             >
//               Projects
//             </h3>
//             {resumeData.workExperience.length > 0 && (
//               <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
//                 {(provided) => (
//                   <div {...provided.droppableProps} ref={provided.innerRef}>
//                     {resumeData.workExperience.map((item, index) => (
//                       <Draggable
//                         key={`${item.company}-${index}`}
//                         draggableId={`WORK_EXPERIENCE-${index}`}
//                         index={index}
//                       >
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`mb-5 hover:scale-105 transition-transform duration-300 ${
//                               snapshot.isDragging &&
//                               "outline-dashed outline-2 outline-blue-900 bg-white"
//                             }`}
//                           >
//                             <div className="justify-between space-y-1 flex text-black">
//                               <p
//                                 className=" text-2xl text-black"
//                                 style={{ fontSize: "1.3rem" }}
//                               >
//                                 {item.company}
//                               </p>
//                               <DateRange
//                                 startYear={item.startYear}
//                                 endYear={item.endYear}
//                                 id={`work-experience-start-end-date`}
//                               />
//                             </div>
//                             <p className=" text-black">{item.position}</p>
//                             <p
//                               contentEditable="true"
//                               suppressContentEditableWarning={true}
//                               className="text-md font-normal hyphens-auto text-black hover:outline-dashed hover:outline-2 hover:outline-gray-400"
//                             >
//                               {item.description}
//                             </p>
//                             <Droppable
//                               droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                               type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                             >
//                               {(provided) => (
//                                 <ul
//                                   className="list-disc pl-5  text-black"
//                                   {...provided.droppableProps}
//                                   ref={provided.innerRef}
//                                 >
//                                   {typeof item.keyAchievements === "string" &&
//                                     item.keyAchievements
//                                       .split("\n")
//                                       .map((achievement, subIndex) => (
//                                         <Draggable
//                                           key={`${item.company}-${index}-${subIndex}`}
//                                           draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                           index={subIndex}
//                                         >
//                                           {(provided, snapshot) => (
//                                             <li
//                                               ref={provided.innerRef}
//                                               {...provided.draggableProps}
//                                               {...provided.dragHandleProps}
//                                               className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
//                                                                                             ${
//                                                                                               snapshot.isDragging &&
//                                                                                               "outline-dashed outline-2 outline-gray-400 bg-white text-black"
//                                                                                             }`}
//                                             >
//                                               <div
//                                                 dangerouslySetInnerHTML={{
//                                                   __html: achievement,
//                                                 }}
//                                                 contentEditable
//                                               />
//                                             </li>
//                                           )}
//                                         </Draggable>
//                                       ))}
//                                   {provided.placeholder}
//                                 </ul>
//                               )}
//                             </Droppable>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             )}
//             {resumeData.projects.length > 0 && (
//               <Droppable droppableId="projects" type="PROJECTS">
//                 {(provided) => (
//                   <div {...provided.droppableProps} ref={provided.innerRef}>
//                     <h2
//                       className="section-title mb-1 border-b-2 border-gray-300 editable text-cyan-800"
//                       contentEditable
//                       suppressContentEditableWarning
//                       style={{ color: headerColor }}
//                     >
//                       Projects
//                     </h2>
//                     {resumeData.projects.map((item, index) => (
//                       <Draggable
//                         key={`${item.name}-${index}`}
//                         draggableId={`PROJECTS-${index}`}
//                         index={index}
//                       >
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`hover:scale-105 transition-transform duration-300 mb-1 ${
//                               snapshot.isDragging &&
//                               "outline-dashed outline-2 outline-gray-400 bg-white text-cyan-800"
//                             }`}
//                           >
//                             <div className="flex flex-row justify-between space-y-1">
//                               <p className="font-semibold text-lg">
//                                 {item.name}
//                               </p>
//                               <DateRange
//                                 startYear={item.startYear}
//                                 endYear={item.endYear}
//                                 id={`work-experience-start-end-date`}
//                               />
//                             </div>
//                             <Link
//                               href={item.link}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="content"
//                             >
//                               {item.link}
//                             </Link>
//                             <p className=" text-cyan-800">{item.description}</p>
//                             <Droppable
//                               droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
//                               type="PROJECTS_KEY_ACHIEVEMENT"
//                             >
//                               {(provided) => (
//                                 <ul
//                                   className="list-disc pl-5 content text-cyan-800"
//                                   {...provided.droppableProps}
//                                   ref={provided.innerRef}
//                                 >
//                                   {typeof item.keyAchievements === "string" &&
//                                     item.keyAchievements
//                                       .split("\n")
//                                       .map((achievement, subIndex) => (
//                                         <Draggable
//                                           key={`${item.name}-${index}-${subIndex}`}
//                                           draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                           index={subIndex}
//                                         >
//                                           {(provided, snapshot) => (
//                                             <li
//                                               ref={provided.innerRef}
//                                               {...provided.draggableProps}
//                                               {...provided.dragHandleProps}
//                                               className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
//                                                                                             ${
//                                                                                               snapshot.isDragging &&
//                                                                                               "outline-dashed outline-2 outline-gray-400 bg-white text-cyan-800"
//                                                                                             }`}
//                                             >
//                                               <div
//                                                 dangerouslySetInnerHTML={{
//                                                   __html: achievement,
//                                                 }}
//                                                 contentEditable
//                                               />
//                                             </li>
//                                           )}
//                                         </Draggable>
//                                       ))}
//                                   {provided.placeholder}
//                                 </ul>
//                               )}
//                             </Droppable>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             )}
//           </div>
//         </div>
//         <div className="p-5">
//           <h2
//             className="text-xl text-blue-900 mb-5 font-bold"
//             style={{ color: headerColor }}
//           >
//             EDUCATION
//           </h2>
//           <div className="border-b-2 border-blue-900 mb-5"></div>
//           <div className="mb-4 ">
//             <ul className="list-none p-0">
//               {resumeData.education.length > 0 && (
//                 <div className="mb-5">
//                   {resumeData.education.map((item, index) => (
//                     <div key={index} className="text-black mb-5">
//                       <p
//                         className="text-lg font-semibold"
//                         style={{ fontSize: "1.3rem" }}
//                       >
//                         {item.degree}
//                       </p>
//                       <p className="">{item.school}</p>
//                       <DateRange
//                         className="mb-1 text-lg"
//                         startYear={item.startYear}
//                         endYear={item.endYear}
//                         id={`education-start-end-date`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </ul>
//           </div>
//         </div>
//         <div className="p-5">
//           <h2
//             className="text-xl capitalize text-blue-900 font-bold"
//             style={{ color: headerColor }}
//           >
//             SKILLS
//           </h2>
//           <div className="border-b-2 border-blue-900 mb-2 mt-2"></div>
//           <Droppable droppableId="skills" type="SKILLS">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {resumeData.skills.map((skill, index) => (
//                   <Draggable
//                     key={`SKILLS-${index}`}
//                     draggableId={`SKILLS-${index}`}
//                     index={index}
//                   >
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className={`border-0 text-black mb-5 hover:scale-105 transition-transform duration-300 ${
//                           snapshot.isDragging && "inline"
//                         }`}
//                       >
//                         <Skills title={skill.title} skills={skill.skills} />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//         <div className="p-5">
//           <h2
//             className="text-xl capitalize text-blue-900 font-bold mb-5"
//             style={{ color: headerColor }}
//           >
//             LANGUAGE
//           </h2>
//           <div className="border-b-2 border-blue-900 mb-5"></div>
//           <div className="text-black mb-4 font-bold ">
//             <Language languages={resumeData.languages} />
//           </div>
//         </div>
//         {/* <button
//               onClick={extractHtml}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               Log HTML Content
//             </button> */}
//         {/* <div className="text-left p-5">
//                     <h2 className="text-2xl font-bold uppercase text-blue-900 mb-5">Reference</h2>
//                     <div className="border-b-2 border-blue-900 mb-5"></div>
//                     <div className="flex space-between">
//                         <div className="mb-5">
//                             <p className="text-xl capitalize text-black font-bold mb-5">Estelle Darcy</p>
//                             <p className="font-light mb-2 text-sm text-black">Wardlere Inc. / CTO</p>
//                             <p className="font-light mb-2 text-sm text-black">Phone: 123-456-7890</p>
//                             <p className="font-light mb-2 text-sm text-black">Email: abc@gmail.com</p>
//                         </div>
//                         <div className="mb-5">
//                             <p className="text-xl capitalize text-black font-bold mb-5">Harper Richard</p>
//                             <p className="font-light mb-2 text-sm text-black">Wardlere Inc. / CEO</p>
//                             <p className="font-light mb-2 text-sm text-black">Phone: 123-456-7890</p>
//                             <p className="font-light mb-2 text-sm text-black">Email: abc@gmail.com</p>
//                         </div>
//                     </div>
//                 </div> */}
//       </div>
//     </div>
//   );
// };

// const A4PageWrapper = ({ children }) => {
//   const alertA4Size = () => {
//     const preview = document.querySelector(".preview");
//     const previewHeight = preview.offsetHeight;
//     console.log(previewHeight);
//     if (previewHeight > 1122) {
//       alert("A4 size exceeded");
//     }
//   };

//   return (
//     <div className="w-8.5in border p-3" onLoad={alertA4Size}>
//       {children}
//     </div>
//   );
// };

// export default Template22;

import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

import Language from "./Language";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";
import EducationSection1 from "./Education1";
import Certification from "./Certification";

const Template22 = () => {
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

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
    <div ref={templateRef} style={{ fontFamily: `${selectedFont}` }}>
      <div
        className="p-4 flex justify-between"
        style={{ borderBottom: `2px solid ${backgroundColorss}` }}
      >
        <div className={`  `}>
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
            />
          )}
          <div className={`mt-4  `}>
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
          </div>
        </div>
        <div className=" pt-4 ">
          {/* <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>CONTACT</h2> */}
          <ContactAndSocialMedia
            contactData={{
              teldata: resumeData.contactInformation,
              emaildata: resumeData.email,
              addressdata: resumeData.address,
            }}
            socialMediaData={resumeData.socialMedia}
            icons={icons}
            layout="col" // or "row"
            contactClass=""
            socialMediaClass=""
            className="items-start justify-start"
          />
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="mb-5">
          <SummaryWrapper
            summary={resumeData.summary}
            headerColor={"black"}
            editable={true} // Set to false if editing is not required
            className="mt-4"
          />
        </div>

        <div class="mb-5">
          <WorkExperience
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
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
          <SkillsWrapper
            skills={resumeData.skills}
            headerColor={"black"}
            droppableId="skills-section-1"
            className="mt-2 flex flex-row justify-between"
            layout="col "
            textColor="black"
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
    </div>
  );
};

export default Template22;
