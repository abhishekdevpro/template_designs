"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import ImageWrapper from "./ImageWrapper";
import SocialInfo from "./SocialInfo";

const CoverLetter4 = () => {
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  return (
    <div className="" style={{ fontFamily: `${selectedFont}` }}>
      <div
        className=" mx-auto p-4 "
        // style={{ backgroundColor: backgroundColorss || "white" }}
      >
        {/* Personal Information Section */}
        <div
          className="p-4 "
          style={{
            borderTop: `2px solid ${backgroundColorss}`,
            borderBottom: `2px solid ${backgroundColorss}`,
          }}
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
            <div>
              <PersonalInfoWrapper
                personalDetails={coverLetterData?.personalDetails || {}}
                //  headerColor={backgroundColorss ? "white" : "black"}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <SocialInfo
          personalDetails={coverLetterData?.personalDetails || {}}
          // headerColor={backgroundColorss ? "white" : "black"}\
          className="px-8 mt-2"
        />
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
        className="px-8 mt-2"
      />
    </div>
  );
};

export default CoverLetter4;
