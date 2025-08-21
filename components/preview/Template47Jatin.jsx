import { useContext, useRef } from "react";

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

import { ResumeContext } from "../context/ResumeContext";

import EducationSection from "./Education";
import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";

const Template47Jatin = () => {
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
      className="flex flex-col gap-4 mt-[70px]"
      style={{ fontFamily: `${selectedFont}` }}
    >
        <div className="flex justify-between gap-4">
            <div className="">
                <TextWrapper
        name={resumeData.name}
        position={resumeData.position}
        headerColor={backgroundColorss}
        orientation="column" // Use "column" for stacked layout
        />

            </div>

            {/*img*/}

            <div className="relative mt-[60px] max-w-full">
                        {resumeData?.profilePicture && (
                          <ImageWrapper
                            src={resumeData.profilePicture}
                            alt="Profile Picture"
                            className="w-[180px] h-[180px] border-2 border-black rounded-xl "
                          />
                        )}
                      </div>
        </div>
        <div className="flex ">

      <SummaryWrapper
        summary={resumeData.summary}
        headerColor={"black"}
        editable={true} // Set to false if editing is not required
        className="mt-4 mr-[80px]"
        />

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

        <div className="flex">

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

        <div className="ml-[100px]">
          <SkillsWrapper
            skills={resumeData.skills}
            headerColor={"black"}
            droppableId="skills-section-1"
            className="mt-4 "
            layout="row"
            textColor="black"
            />
        </div>
        </div>
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
      <ProjectsSection
        resumeData={resumeData}
        headerColor={backgroundColorss}
      />

      
      <Certification
        title="Certifications"
        certifications={resumeData.certifications}
        hasBullet={false}
        headerColor={"black"}
        />
      <Language
        title="Languages"
        languages={resumeData.languages}
        headerColor={"black"}
        className="ml-[120px]"
        />
       
    </div>
  );
};

export default Template47Jatin;
