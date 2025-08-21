import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cvletter1 from "./cvimgs/cvletter1.png";
import cvletter2 from "./cvimgs/cvletter2.png";
import cvletter3 from "./cvimgs/cvletter3.png";
import cvletter4 from "./cvimgs/cvletter4.png";
import cvletter5 from "./cvimgs/cvletter5.png";
import cvletter6 from "./cvimgs/cvletter6.png";
import cvletter7 from "./cvimgs/cvletter7.png";
import cvletter8 from "./cvimgs/cvletter8.png";
import cvletter9 from "./cvimgs/cvletter9.png";
import cvletter10 from "./cvimgs/cvletter10.png";
import cvletter11 from "./cvimgs/cvletter11.png";
const TemplateSelector = ({
  selectedTemplate,
  setSelectedTemplate,
  selectedPdfType,
  setSelectedPdfType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [templateId, setTemplateId] = useState(selectedTemplate);
  const templates = [
    { key: "template1", imageUrl: cvletter1, pdfType: 4 },
    { key: "template2", imageUrl: cvletter2, pdfType: 2 },
    { key: "template3", imageUrl: cvletter3, pdfType: 3 },
    { key: "template4", imageUrl: cvletter4, pdfType: 3 },
    { key: "template5", imageUrl: cvletter5, pdfType: 4 },
    { key: "template6", imageUrl: cvletter6, pdfType: 4 },
    { key: "template7", imageUrl: cvletter7, pdfType: 4 },
    { key: "template8", imageUrl: cvletter8, pdfType: 4 },
    { key: "template9", imageUrl: cvletter9, pdfType: 4 },
    { key: "template10", imageUrl: cvletter10, pdfType: 4 },
    { key: "template11", imageUrl: cvletter11, pdfType: 4 },
  ];

  useEffect(() => {
    const selectedIndex = templates.findIndex(
      (template) => template.key == selectedTemplate
    );
    if (selectedIndex !== -1) {
      setSelectedPdfType(templates[selectedIndex].pdfType);
      setCurrentIndex(selectedIndex);
    }
    setTemplateId(selectedTemplate);
  }, [selectedTemplate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTemplateClick = (templateKey) => {
    setSelectedTemplate(templateKey);
    setTemplateId(templateKey);
    setSelectedPdfType(templateKey.pdfType);
    closeModal();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="hidden md:block rounded-full border-2 m-2 border-primary px-5 py-2 font-bold bg-white text-primary hover:bg-primary/20"
      >
        <span>Selected: {templateId || "template1"}</span>
      </button>
      <button
        onClick={openModal}
        className="block md:hidden rounded-lg border-2 m-2 border-primary px-5 py-2 font-bold bg-white text-primary"
      >
        Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gradient-to-b from-white to-blue-100">
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-lg font-bold mb-6 text-center border rounded-3xl py-2 text-white bg-gray-800">
              Select a Template
            </div>

            {/* Grid Layout */}
            <div className="max-h-[70vh] overflow-y-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.key}
                  onClick={() => handleTemplateClick(template.key)}
                  className={`cursor-pointer transition-transform duration-200 ${
                    template.key === templateId
                      ? "scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2 border-2 transition-colors duration-300 ${
                      template.key === templateId
                        ? "border-primary bg-blue-100"
                        : "border-transparent hover:border-blue-300"
                    }`}
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={template.imageUrl}
                        alt={template.key}
                        fill
                        className="object-fill"
                      />
                    </div>
                    <div
                      className={`mt-2 text-center py-2 px-4 rounded-md transition-colors duration-300 ${
                        template.key === templateId
                          ? "bg-primary text-white font-semibold"
                          : "text-gray-600 group-hover:text-primary"
                      }`}
                    >
                      {template.key}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            {/* <button
              onClick={closeModal}
              className="mt-6 w-full sm:w-auto px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
