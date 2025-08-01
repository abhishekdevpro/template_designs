import { useContext, useRef } from "react";

import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import ContactAndSocialMedia from "./ContactAndSocial";

import EducationSection from "./Education";

import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common1";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import Certification from "./Certification";
import Language from "./Language";

const Template17 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  const templateRef = useRef(null);

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
      <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
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
        <div className="">
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
            className="justify-start gap-4 mt-4"
            textColor="text-white "
          />
        </div>
      </div>
      <div className="mx-auto  px-4">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true} // Set to false if editing is not required
          className="mt-4"
        />
        <section className="skills mb-6">
          <SkillsWrapper
            skills={resumeData.skills}
            headerColor={"black"}
            droppableId="skills-section-1"
            className="mt-2 flex flex-row justify-between"
            layout="col "
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
          {
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
          }
        </section>

        <section className="certification mb-6">
          <Certification
            title="Certifications"
            certifications={resumeData.certifications}
            hasBullet={true}
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
    </div>
  );
};

export default Template17;
