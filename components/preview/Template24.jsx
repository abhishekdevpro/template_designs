import { useContext, useRef } from "react";
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
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection1 from "./Education1";

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

const Template24 = () => {
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
    <div className="   " style={{ fontFamily: `${selectedFont}` }}>
      <div class="flex gap-1 items-start ">
        <div class="border-solid border-cyan-900 mb-5 w-1/3">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
            />
          )}
        </div>
        <div className="mb-8 pt-2.5	w-2/3 text-left">
          <div class="border-solid border-2 border-black mb-2 "></div>
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
      <div class="border-solid border-2 border-black mb-5 mt-4 "></div>

      <div className="mb-5">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true}
          className=""
        />
      </div>
      <div class="border-solid border-2 border-black mb-5 "></div>

      <div className="mb-5">
        <WorkExperience
          itemClassNames={{
            title: "text-xl font-semibold mb-1 editable",
            company: "",
            position: "",
            location: "",
          }}
          resumeData={resumeData}
          headerColor={backgroundColorss}
        />
        <div>
          <div class="border-solid border-2 border-black mb-5 "></div>
          <div className="mb-5">
            <ProjectsSection
              resumeData={resumeData}
              headerColor={backgroundColorss}
            />
          </div>
        </div>
        <div class="border-solid border-2 border-black"></div>
        <div class="flex gap-2">
          <div className="mb-8 w-2/6 p-5 border-r-4	border-black">
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={"black"}
              droppableId="skills-section-1"
              className="mt-4"
              layout="column"
              textColor="black"
            />
          </div>
          <div className="mb-8 w-2/6 p-5 border-r-4	border-black">
            <EducationSection1
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="column"
              educationData={resumeData?.education}
              headerColor={"black"}
            />
            <div className="mb-8">
              <Language
                title="Languages"
                languages={resumeData.languages}
                headerColor={"black"}
              />
            </div>
          </div>
          <div class="text-left text-black w-2/6 p-5">
            <div className="mb-8">
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
                hasBullet={true}
                headerColor={"black"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Template24;
