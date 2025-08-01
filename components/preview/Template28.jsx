import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

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

import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";

const Template28 = () => {
  const templateRef = useRef(null);

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
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div className="  flex">
        {/* Left Column */}
        <div
          className="left-column w-4/12 bg-gray-100 p-5"
          style={{ backgroundColor: backgroundColorss }}
        >
          <div className="mb-10 justify-center flex ">
            {resumeData?.profilePicture && (
              <ImageWrapper
                src={resumeData.profilePicture}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <ContactAndSocialMedia
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
                textColor="text-white "
              />
            </div>
            <div className="mb-4">
              <SummaryWrapper
                summary={resumeData.summary}
                headerColor={"white"}
                editable={true}
                className=""
              />
            </div>
            <div className="mb-4">
              <SkillsWrapper
                skills={resumeData.skills}
                headerColor={backgroundColorss ? "white" : "black"}
                droppableId="skills-section-1"
                className="mt-4"
                layout="column"
              />
            </div>
            <div className="mb-4">
              <Language
                title="Languages"
                languages={resumeData.languages}
                headerColor={backgroundColorss ? "white" : "black"}
              />
            </div>
            <div className="mb-4">
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
                hasBullet={true}
                headerColor={backgroundColorss ? "white" : "black"}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column w-8/12 p-5 ml-4 ">
          {/* Header Section with TextWrapper and conditional ImageWrapper */}
          <div
            className="mb-2 py-4 border-b-2"
            style={{ borderColor: backgroundColorss }}
          >
            {/* Half-width top border */}
            <div
              className="h-0.5 w-1/4 mb-2 "
              style={{
                backgroundColor: backgroundColorss,
              }}
            />

            <TextWrapper
              name={resumeData?.name}
              position={resumeData?.position}
              className="justify-start items-start"
              headerColor={backgroundColorss}
              orientation="column"
            />
          </div>

          {/* Rest of the left column content */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="col-span-2 space-y-2">
              <div className="mb-4">
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
              <div className="mb-4">
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
              </div>
              <div className="mb-4">
                <ProjectsSection
                  resumeData={resumeData}
                  headerColor={backgroundColorss}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template28;
