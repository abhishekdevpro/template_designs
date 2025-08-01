"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import SocialInfo from "./SocialInfo";
import ImageWrapper from "./ImageWrapper";

const CoverLetter5 = () => {
  const { coverLetterData, backgroundColorss, headerColor, selectedFont } =
    useContext(CoverLetterContext);

  return (
    <div className="" style={{ fontFamily: `${selectedFont}` }}>
      <div className="  p-4  " style={{ backgroundColor: backgroundColorss }}>
        <div
          className={`${
            coverLetterData?.photo
              ? "flex justify-start gap-8"
              : "flex justify-center items-center text-center"
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
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
      </div>

      <div className=" flex justify-between p-4 gap-2 ">
        <div>
          {/* Letter Details Section */}
          <LetterDetailsWrapper
            letterDetails={coverLetterData?.letterDetails || {}}
            // editable={true}
            headerColor={"black"}
            className="p-4"
          />
        </div>
        <div className="p-4">
          <SocialInfo
            personalDetails={coverLetterData?.personalDetails || {}}
            // headerColor={backgroundColorss ? "white" : "black"}
          />
        </div>
      </div>
      <div className="px-4">
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

export default CoverLetter5;
