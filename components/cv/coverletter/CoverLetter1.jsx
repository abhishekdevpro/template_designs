"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper, { TextWrapper } from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import ImageWrapper from "./ImageWrapper";
import SocialInfo from "./SocialInfo";

const CoverLetter1 = () => {
  const templateRef = useRef(null);
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };
  console.log(coverLetterData, ">>>>>cv1.jsx");
  return (
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div
        className=" flex justify-between p-4 gap-2 "
        style={{ backgroundColor: backgroundColorss }}
      >
        <div
          className={`${
            coverLetterData?.photo ? "flex justify-start gap-8" : ""
          }`}
        >
          <div>
            {coverLetterData?.photo && (
              <ImageWrapper
                src={coverLetterData.photo}
                className="w-32 h-32 rounded-full"
              />
            )}
          </div>

          {/* Personal Information Section */}
          <div>
            <PersonalInfoWrapper
              personalDetails={coverLetterData?.personalDetails || {}}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
        <div>
          <SocialInfo
            personalDetails={coverLetterData?.personalDetails || {}}
            headerColor={backgroundColorss ? "white" : "black"}
          />
        </div>
      </div>
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
  );
};

export default CoverLetter1;
