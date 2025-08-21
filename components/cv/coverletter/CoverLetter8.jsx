"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import SocialInfo from "./SocialInfo";

const CoverLetter8 = ({}) => {
  const templateRef = useRef(null);
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  return (
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div
        className="flex justify-end mx-auto p-4 "
        // style={{ backgroundColor: backgroundColorss || "white" }}
      >
        {/* Personal Information Section */}
        <div
          className=" p-4 gap-2 "
        //   style={{
        //     borderBottom: `2px solid ${backgroundColorss}`,
        //   }}
        >
          {/* Personal Information Section */}
          <div>
            <PersonalInfoWrapper
              personalDetails={coverLetterData?.personalDetails || {}}
              // headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>

          <div>
            <SocialInfo
              personalDetails={coverLetterData?.personalDetails || {}}
              // headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
      </div>
      <div className="px-4">
        {/* Letter Details Section */}
        <LetterDetailsWrapper
          letterDetails={coverLetterData?.letterDetails || {}}
          // editable={true}
          headerColor={"black"}
          className="p-4"
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
        />
      </div>
    </div>
  );
};

export default CoverLetter8;
