import React, { useState, useRef } from "react";
import { ArrowLeft, Download, Save } from "lucide-react";
import TemplateSelector from "../components/cv/coverletter/CvSelector";
import CoverLetterEditor from "../components/cv/coverletterform/CoverLetterEditor";
import Navbar from "./Navbar/Navbar";
import ColorPickers from "./ColorPickers";
import CoverLetterPreview from "../components/cv/coverletter/CoverLetterPreview";

const MobileCoverLetterBuilder = ({
  selectedFont,
  handleFontChange,
  backgroundColorss,
  setBgColor,
  selectedTemplate,
  setSelectedTemplate,
  handleFinish,
  downloadAsPDF,
  templateRef,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {!isPreviewMode ? (
        // Form Mode
        <div className="flex flex-col min-h-screen bg-[#002a48]">
          {/* Editor Section */}
          <div className="flex-grow p-4">
            <CoverLetterEditor />
          </div>

          {/* Next Button */}
          <div className="sticky bottom-0 w-full p-4 bg-white shadow-t">
            <button
              onClick={togglePreviewMode}
              className="w-full bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-medium"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Preview Mode
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Sticky Options Bar */}
          <div className="sticky top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
            <div className="flex flex-row flex-wrap justify-center items-center ">
              {/* Font Selector */}
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className=" h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white"
              >
                <option value="Ubuntu">Ubuntu</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Verdana">Verdana</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Lucida Console">Lucida Console</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="Inter">Inter</option>
              </select>

              {/* Color Picker */}
              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />

              {/* Template Selector */}
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>
          </div>

          {/* Preview Content */}
          <div className=" ">
            <CoverLetterPreview
              selectedTemplate={selectedTemplate}
              ref={templateRef}
            />
          </div>

          {/* Fixed Bottom Actions */}
          {/* <div className="sticky bottom-0 w-full bg-white shadow-t p-4"> */}
          <div className="flex items-center justify-center gap-4 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            <button
              onClick={togglePreviewMode}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg"
            >
              <ArrowLeft size={20} />
              {/* Back to Editor */}
            </button>
            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-lg"
            >
              <Save size={20} />
              {/* Save Cover Letter */}
            </button>
            <button
              onClick={downloadAsPDF}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg"
            >
              <Download size={20} />
              {/* Download */}
            </button>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default MobileCoverLetterBuilder;
