import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";
import Language from "./Language";
import Certification from "./Certification";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Template32Jatin = () => {
  const templateRef = useRef(null);

  const {
    resumeData,
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
    <div
      ref={templateRef}
      style={{ fontFamily: `${selectedFont}`, backgroundColor: "#fff" }}
    >
      <div className="flex">
        {/* Left Sidebar */}
        <div
          className="w-4/12 min-h-screen px-6 py-8"
          style={{ backgroundColor: backgroundColorss || "#1a2a40", color: "white" }}
        >
          <div className="flex justify-center mb-6">
            {resumeData?.profilePicture && (
              <ImageWrapper
                src={resumeData.profilePicture}
                alt="Profile Picture"
                className="w-28 h-28 rounded-full object-cover border-4 border-white"
              />
            )}
          </div>
          <ContactAndSocialMedia
            title="CONTACT"
            contactData={{
              teldata: resumeData.contactInformation,
              emaildata: resumeData.email,
              addressdata: resumeData.address,
            }}
            socialMediaData={resumeData.socialMedia}
            icons={icons}
            layout="column"
            textColor="text-white"
            className="mb-6"
          />

          <EducationSection
            itemClassNames={{}}
            layout="column"
            educationData={resumeData?.education}
            headerColor="white"
            className="mb-6"
          />

          <SkillsWrapper
            skills={resumeData.skills}
            headerColor="white"
            droppableId="skills-section-1"
            layout="column"
            className="mb-6"
          />

          <Language
            title="LANGUAGES"
            languages={resumeData.languages}
            headerColor="white"
            className="mb-6"
          />

          <Certification
            title="CERTIFICATIONS"
            certifications={resumeData.certifications}
            hasBullet={true}
            headerColor="white"
            className="mt-6"
          />
        </div>

       {/* Right Section */}
        <div className="w-8/12 px-12 py-8">
          <div className="mb-6">
            <TextWrapper
              name={resumeData?.name}
              position={resumeData?.position}
              className="text-left"
              headerColor="#000"
              orientation="column"
            />
          </div>

          <SummaryWrapper
            summary={resumeData.summary}
            headerColor="#000"
            editable={true}
            className="mb-4"
          />

          <WorkExperience
            itemClassNames={{
              title: "text-base font-semibold mb-1",
              company: "text-sm font-medium",
              position: "text-sm italic",
              location: "text-sm text-gray-600",
            }}
            resumeData={resumeData}
            headerColor="#000"
          />

          <ProjectsSection
            resumeData={resumeData}
            headerColor="#000"
          />
        </div>
      </div>
    </div>
  );
};

export default Template32Jatin;
