import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import { CoverLetterContext } from "../components/context/CoverLetterContext";
import CoverLetterEditor from "../components/cv/coverletterform/CoverLetterEditor";
import TemplateSelector from "../components/cv/coverletter/CvSelector";
import CoverLetterPreview from "../components/cv/coverletter/CoverLetterPreview";
import ColorPickers from "./ColorPickers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MobileCoverLetterBuilder from "./mobile-cv-builder";
function CoverLetterBuilder() {
  const {
    coverLetterData,
    setCoverLetterData,
    backgroundColorss,
    selectedFont,
    setSelectedFont,
    setBgColor,
    setHeaderColor,
    setPhoto,
    photo,
  } = useContext(CoverLetterContext);
  const router = useRouter();
  const templateRef = useRef(null);
  const [token, setToken] = useState(null);
  const [coverletterId, setCoverLetterId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://api.abroadium.com/api/jobseeker/coverletter/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(coverLetterData, ">>>coverlettersdata");

          if (response.data.status === "success") {
            const { data } = response.data;
            // console.log(data,"rnd");

            const parsedData = data.cover_letter_obj;
            console.log(parsedData, ">>>parsedData");
            setCoverLetterData(parsedData.coverletterInfo);

            if (parsedData?.coverletterInfo?.templateDetails) {
              setBgColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.coverletterInfo.templateDetails.templateId ||
                  "template1"
              );
              setSelectedFont(
                parsedData.templateData.templateDetails.font || "Ubuntu"
              );
              // setPhoto(data.photo);
            }
          }
        } catch (error) {
          console.error("Error fetching cover letter  data:", error);
          toast.error("Failed to fetch cover letter  data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setCoverLetterId(id);
  }, []);

  const formatCoverLetterData = (data) => {
    // console.log(data, ">>>data");
    return {
      closing: data.closing || "",
      body: data.body || "",
      gratitude: data.gratitude || "",
      introduction: data.introduction || "",
      letterDetails: {
        companyName: data.letterDetails?.companyName || "",
        date: data.letterDetails?.date || "",
        jobTitle: data.letterDetails?.jobTitle || "",
        reference: data.letterDetails?.reference || "",
        salutation: data.letterDetails?.salutation || "",
      },

      signature: data.signature || "",
      templateDetails: {
        templateId: selectedTemplate,
        backgroundColor: backgroundColorss || "",
        font: selectedFont || "Ubuntu",
      },
      personalDetails: {
        name: data.personalDetails?.name || "",
        position: data.personalDetails?.position || "",
        address: data.personalDetails?.address || "",
        email: data.personalDetails?.email || "",
        contact: data.personalDetails?.contact || "",
        photo: data.photo || "",
      },
      photo: data.photo || "",
    };
  };

  const handleFinish = async () => {
    if (!coverLetterData) return;
    const coverletterInfo = {
      coverletterInfo: formatCoverLetterData(coverLetterData),
    };
    console.log(coverLetterData, ">>>coverlettersdata");
    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      toast.error("Error: Template content is missing.");
      return;
    }

    const coverletterHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
    try {
      const coverletterId = router.query.id || localStorage.getItem("id");
      if (!coverletterId) {
        toast.error("Cover Letter ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/coverletter/${coverletterId}`,

        { ...coverletterInfo, cover_letter_html: coverletterHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        // setIsSaved(true);
        // localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    }
  };
  const downloadAsPDF = async () => {
    handleFinish();
    if (!templateRef.current) {
      toast.error("Template reference not found");
      return;
    }

    try {
      const htmlContent = templateRef.current.innerHTML;

      const fullContent = `
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        ${htmlContent}
      `;

      // const response = await axios.post(
      //   "https://api.abroadium.com/api/jobseeker/generate-pdf1",
      //   { html: fullContent },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: token,
      //     },
      //   }
      // );

      downloadPDF();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate and open PDF"
      );
    }
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/download-coverletter/${coverletterId}?pdf_type=${selectedPdfType}`,

        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download the PDF. Please try again.");
    }
  };

  return (
    // <CoverLetterProvider>
    <>
      {isMobile ? (
        <MobileCoverLetterBuilder
          selectedFont={selectedFont}
          handleFontChange={handleFontChange}
          backgroundColorss={backgroundColorss}
          setBgColor={setBgColor}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          handleFinish={handleFinish}
          downloadAsPDF={downloadAsPDF}
          templateRef={templateRef}
        />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <Navbar />
          </div>

          {/* Main Content */}
          <div className=" bg-gray-50 ">
            {/* Sticky Options Bar */}
            <div className="sticky top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Font Selector and Options */}
                <div className="flex items-center gap-4">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="w-48 h-10 rounded-full border border-primary px-4 font-bold text-primary bg-white focus:ring-2 focus:ring-primary hover:bg-primary/20"
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

                  <ColorPickers
                    selectmultiplecolor={backgroundColorss}
                    onChange={setBgColor}
                  />
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    selectedPdfType={selectedPdfType}
                    setSelectedPdfType={setSelectedPdfType}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleFinish}
                    className="bg-primary text-white px-6 py-2 rounded-full"
                  >
                    Save Cover Letter
                  </button>
                  <button
                    onClick={downloadAsPDF}
                    className="bg-success text-white px-6 py-2 rounded-full"
                  >
                    Pay & Download
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Main Content */}
            <div className="flex flex-col md:flex-row flex-grow p-4">
              {/* Editor Section */}
              <div className="w-[40%] overflow-auto bg-primary">
                <main className="w-full mx-auto md:p-4">
                  <CoverLetterEditor />
                </main>
              </div>

              {/* Preview Section */}
              <aside className="w-[60%] min-h-screen border-l bg-gray-50">
                <div className="sticky top-20 p-4">
                  <CoverLetterPreview
                    selectedTemplate={selectedTemplate}
                    ref={templateRef}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>

    // // <div className="flex flex-col min-h-screen">
    //   {/* Navbar */}
    //   <div className="sticky top-0 z-50 bg-white shadow-md">
    //     <Navbar />
    //   </div>

    //   {/* Main Content */}
    //   <div className="bg-gray-50">
    //     {/* Options Bar - Sticky on desktop, normal flow on mobile */}
    //     <div className="sticky top-16 md:top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
    //       <div className="flex flex-col gap-4">
    //         {/* Font and Color Options */}
    //         <div className="flex flex-wrap items-center gap-4">
    //           <select
    //             value={selectedFont}
    //             onChange={handleFontChange}
    //             className="w-full sm:w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
    //           >
    //             <option value="Ubuntu">Ubuntu</option>
    //             <option value="Calibri">Calibri</option>
    //             <option value="Georgia">Georgia</option>
    //             <option value="Roboto">Roboto</option>
    //             <option value="Poppins">Poppins</option>
    //           </select>

    //           <ColorPickers
    //             selectmultiplecolor={backgroundColorss}
    //             onChange={setBgColor}
    //             className="w-full sm:w-auto"
    //           />

    //           <TemplateSelector
    //             selectedTemplate={selectedTemplate}
    //             setSelectedTemplate={setSelectedTemplate}
    //             className="w-full sm:w-auto"
    //           />
    //         </div>

    //         {/* Action Buttons */}
    //         <div className="flex flex-col sm:flex-row gap-4">
    //           <button
    //             onClick={handleFinish}
    //             className="w-full sm:w-auto bg-blue-950 text-white px-6 py-2 rounded-lg"
    //           >
    //             Save Cover Letter
    //           </button>
    //           <button
    //             onClick={downloadAsPDF}
    //             className="w-full sm:w-auto bg-yellow-500 text-black px-6 py-2 rounded-lg"
    //           >
    //             Pay & Download
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Content Area */}
    //     <div className="flex flex-col lg:flex-row flex-grow p-4">
    //       {/* Editor - Full width on mobile, 40% on desktop */}
    //       <div
    //         className="w-full lg:w-[40%] mb-8 lg:mb-0"
    //         style={{ backgroundColor: "#002a48" }}
    //       >
    //         <main className="w-full mx-auto p-4">
    //           <CoverLetterEditor />
    //         </main>
    //       </div>

    //       {/* Preview - Full width on mobile, 60% on desktop */}
    //       <aside className="w-full lg:w-[60%] min-h-screen border-t lg:border-l lg:border-t-0 bg-gray-50">
    //         <div className="p-4">
    //           <CoverLetterPreview
    //             selectedTemplate={selectedTemplate}
    //             ref={templateRef}
    //           />
    //         </div>
    //       </aside>
    //     </div>
    //   </div>
    // </div>
    // </CoverLetterProvider>
  );
}

export default CoverLetterBuilder;
