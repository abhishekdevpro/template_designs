"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import SocialInfo from "./SocialInfo";

const CoverLetter9 = ({}) => {
  const templateRef = useRef(null);
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  return (
      <div className="relative bg-white max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden" style={{ fontFamily: `${selectedFont}`}}>
          {/* <div className="`2px solid ${backgroundColor}`"></div> */}
        <div
          className=" mx-auto p-4 mt-[70px] "
          // style={{ backgroundColor: backgroundColorss || "white" }}
        >
            <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.03,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: `${backgroundColorss}`}} // dark purple
          ></path>
          <path
            d="M0.00,80.00 C150.00,180.00 350.00,-20.00 500.00,80.00 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: `${backgroundColorss}` }} // lighter purple
          ></path>
        </svg>
      </div>
          {/* Personal Information Section */}
          <div
            className="p-4 "
            // style={{
            //   borderTop: `2px solid ${backgroundColorss}`,
            //   borderBottom: `2px solid ${backgroundColorss}`,
            // }}
          >
  
            {/* Personal Information Section */}
            <div
              className={`${
                coverLetterData?.photo ? "flex justify-start gap-8" : ""
              }`}
            >
  
              
              <div>
                {coverLetterData?.photo && (
                  <ImageWrapper
                    src={coverLetterData.photo}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full"
                  />
                )}
              </div>
  
              
  
              {/* Personal Information Section */}
              <div className="">
                <PersonalInfoWrapper
                  personalDetails={coverLetterData?.personalDetails || {}}
                  //  headerColor={backgroundColorss ? "white" : "black"}
                  className="ml-[32px]"
                />
              </div>
  
              <div>
          <SocialInfo
            personalDetails={coverLetterData?.personalDetails || {}}
            // headerColor={backgroundColorss ? "white" : "black"}\
            className="px-8 mt-2"
          />
        </div>
            </div>
          </div>
        </div>
        {/* Letter Details Section */}
        <LetterDetailsWrapper
          letterDetails={coverLetterData?.letterDetails || {}}
          // editable={true}
          headerColor={"black"}
          className="px-8 mt-6"
        />
  
        {/* Introduction and Body Section */}
        <IntroductionBodyWrapper
          // introduction={coverLetterData.introduction}
          body={coverLetterData.body}
          // closing={coverLetterData.closing}
          gratitude={coverLetterData.gratitude}
          signature={coverLetterData.signature}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
          className="px-8 mt-2 mb-[50px]"
        />

        {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.03,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: `${backgroundColorss}` }}
          ></path>
          <path
            d="M0.00,80.00 C150.00,180.00 350.00,-20.00 500.00,80.00 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: `${backgroundColorss}` }}
          ></path>
        </svg>
      </div>
      </div>
    );
};

export default CoverLetter9;