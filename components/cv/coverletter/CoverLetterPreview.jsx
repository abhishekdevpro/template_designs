import React, { useContext, forwardRef } from "react";

import CoverLetter1 from "./CoverLetter1";
import CoverLetter3 from "./CoverLetter3";
import CoverLetter2 from "./CoverLetter2";
import CoverLetter4 from "./CoverLetter4";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import CoverLetter5 from "./CoverLetter5";
import CoverLetter6 from "./CoverLetter6";
import CoverLetter7 from "./CoverLetter7";
import CoverLetter8 from "./CoverLetter8";
import CoverLetter9 from "./CoverLetter9";
import CoverLetter10 from "./CoverLetter10";
import CoverLetter11 from "./CoverLetter11";

// function CoverLetterPreview({ selectedTemplate }) {
const CoverLetterPreview = forwardRef(({ selectedTemplate }, ref) => {
  const { coverLetterData, selectedFont } = useContext(CoverLetterContext);

  const templates = {
    template1: <CoverLetter1 />,
    template2: <CoverLetter2 />,
    template3: <CoverLetter3 />,
    template4: <CoverLetter4 />,
    template5: <CoverLetter5 />,
    template6: <CoverLetter6 />,
    template7: <CoverLetter7 />,
    template8: <CoverLetter8 />,
    template9: <CoverLetter9 />,
    template10: <CoverLetter10 />,
    template11: <CoverLetter11 />,
  };
  console.log(selectedTemplate, "template");
  return (
    // <div className="a4-wrapper-dashboard    ">
    <A4PageWrapper>
      <div ref={ref} className="preview " style={{ fontFamily: selectedFont }}>
        {templates[selectedTemplate]}
      </div>
    </A4PageWrapper>
    // </div>
  );
});
CoverLetterPreview.displayName = "CoverLetterPreview";
const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (preview) {
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    } else {
      console.error("Element with class 'preview' not found.");
    }
  };

  return (
    <div className="a4-wrapper" onLoad={alertA4Size}>
      {children}
    </div>
  );
};
export default CoverLetterPreview;
