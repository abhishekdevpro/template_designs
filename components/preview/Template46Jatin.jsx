import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

import Language2 from "./Language2";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common3";
import { SkillsWrapper2 } from "./SkillWrapper2";
import WorkExperience34 from "./WorkExperience34";
import ProjectsSection2 from "./ProjectSection2";
import EducationSection from "./Education";
import EducationSection1 from "./Education1";
import Certification3 from "./Certification3";
import { isWhiteSpaceLike } from "typescript";

const Template46Jatin = () => {
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
        className="p-4 flex justify-start"
        style={{ borderBottom: `2px solid ${backgroundColorss}` }}
      >
        <div className="mt-[60px]">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
            />
          )}
          {/* <div className={`mt-4  `}>
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
          </div> */}
        </div>
        <div className=" pt-4 ml-[30px]">
          {/* <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>CONTACT</h2> */}
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
        <div className="mb-5 border-t-2">
          <SummaryWrapper
            summary={resumeData.summary}
            headerColor={"black"}
            editable={true} // Set to false if editing is not required
            className="mt-4"
          />
        </div>

        <div class="mb-5">
          <WorkExperience34
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
              company: "font-semibold",
              position: "",
              location: "",
              
            }}
            resumeData={resumeData}
            headerColor="white"
            headerBackground={backgroundColorss}
          />
          <div>
            <div class="mb-5">
              <ProjectsSection2
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
            </div>
          </div>
        </div>
        <div className="mb-7 flex justify-center ">
          <EducationSection
            itemClassNames={{
              school: "text-gray-600",
              degree: "text-xl font-semibold text-gray-800",
              location: "text-gray-800",
            }}
            headerColor= "white"
            educationData={resumeData?.education}
            layout="row"
            bgHeader={backgroundColorss}
            className=""
          />

          <div className="mb-8 ">
          <Certification3
            title="Certifications"
            certifications={resumeData.certifications}
            hasBullet={true}
            headerColor={"black"}
            bgHeader={backgroundColorss}
          />
        </div>
        </div>
        {/* <div className="mb-8 ">
          <Certification
            title="Certifications"
            certifications={resumeData.certifications}
            hasBullet={true}
            headerColor={"black"}
          />
        </div> */}
        <div className="mb-8">
          <SkillsWrapper2
            skills={resumeData.skills}
            // headerColor={"black"}
            droppableId="skills-section-1"
            className="mt-2 flex flex-row justify-between"
            layout="col "
            textColor="black"
            // bgHeader="backgroundColorss"
            headerColor="white"
            headerBackground={backgroundColorss}
          />
        </div>
        <div className="mb-8 ">
          <Language2
            title="Languages"
            languages={resumeData.languages}
            // headerColor={"black"}
            // headerBackground={backgroundColorss}
            // headerColor="black"
            // textColor={"black"}
            // headerColor={backgroundColorss ? "white" : "black"}
            headerColor={"black"}
          />
        </div>
      </div>
    </div>
  );
};

export default Template46Jatin;

