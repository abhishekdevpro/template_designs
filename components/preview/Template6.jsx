// import React from "react";
import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

import Language from "./Language";

import Certification from "./Certification";
// import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { SummaryWrapper, TextWrapper } from "./Common";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";

const Template6 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  // const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
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
    <div className="" style={{ fontFamily: `${selectedFont}` }}>
      <section className="flex justify-between">
        <aside
          className="w-1/12 bg-[#d4d4d8] p-4"
          style={{ backgroundColor: backgroundColorss }}
        ></aside>
        <div className="w-11/12 p-4">
          <div className=" ">
            <div className="mb-8 pt-2.5">
              <TextWrapper
                name={resumeData.name}
                position={resumeData.position}
                headerColor={backgroundColorss}
                orientation="column" // Use "column" for stacked layout
              />
            </div>
            <div className="mb-8">
              {/* <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>CONTACT</h2> */}
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
            <div className="mb-5 ">
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
            <div className="mb-5">
              <SkillsWrapper
                skills={resumeData.skills}
                headerColor={"black"}
                droppableId="skills-section-1"
                className="mt-2 flex flex-row justify-between"
                layout="col "
                textColor="black"
              />
            </div>
            <div className="mb-5 ">
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
                hasBullet={true}
                headerColor={"black"}
              />
            </div>

            <div className="mb-5">
              <Language
                title="Languages"
                languages={resumeData.languages}
                headerColor={"black"}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template6;
