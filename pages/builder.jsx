// // import React, { useState, useRef, createContext, useEffect } from "react";
// // import Language from "../components/form/Language";
// // import axios from "axios";
// // import Meta from "../components/meta/Meta";
// // import FormCP from "../components/form/FormCP";
// // import dynamic from "next/dynamic";
// // import DefaultResumeData from "../components/utility/DefaultResumeData";
// // import SocialMedia from "../components/form/SocialMedia";
// // import WorkExperience from "../components/form/WorkExperience";
// // import Skill from "../components/form/Skill";
// // import PersonalInformation from "../components/form/PersonalInformation";
// // import Summary from "../components/form/Summary";
// // import Projects from "../components/form/Projects";
// // import Education from "../components/form/Education";
// // import Certification from "../components/form/certification";
// // import ColorPicker from "./ColorPicker";
// // import ColorPickers from "./ColorPickers";
// // import Preview from "../components/preview/Preview";
// // import TemplateSelector from "../components/preview/TemplateSelector";
// // import { PDFExport } from "@progress/kendo-react-pdf";
// // import LoadUnload from "../components/form/LoadUnload";
// // import MyResume from "./dashboard/MyResume";
// // import { useRouter } from "next/router";
// // import Sidebar from "./dashboard/Sidebar";
// // import { toast } from "react-toastify";
// // // import LoaderButton from "../components/utility/LoaderButton";
// // // import useLoader from "../hooks/useLoader";
// // import Modal from "./adminlogin/Modal";
// // import { Menu, X } from "lucide-react";
// // import Link from "next/link";
// // const ResumeContext = createContext(DefaultResumeData);

// // const Print = dynamic(() => import("../components/utility/WinPrint"), {
// //   ssr: false,
// // });

// // export default function Builder({ onClose }) {
// //   const [resumeData, setResumeData] = useState(DefaultResumeData);
// //   const [formClose, setFormClose] = useState(false);
// //   const [currentSection, setCurrentSection] = useState(0);
// //   const [selectedFont, setSelectedFont] = useState("Ubuntu");
// //   const [headerColor, setHeaderColor] = useState("");
// //   const [backgroundColorss, setBgColor] = useState("");
// //   const [selectedTemplate, setSelectedTemplate] = useState("template1");
// //   const [isFinished, setIsFinished] = useState(false);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [token, setToken] = useState(null);
// //   const [resumeId, setResumeId] = useState(null);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const router = useRouter();
// //   const pdfExportComponent = useRef(null);
// //   // const [isLoading, handleAction] = useLoader();
// //   const { PayerID } = router.query;
// //   const [isSaved, setIsSaved] = useState(false);
// //   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
// //   const [userId, setUserId] = useState(0);
// //   useEffect(() => {
// //     setUserId(localStorage.getItem("user_id"));
// //   }, []);
// //   console.log(userId, "userid");
// //   // Add toggle function
// //   const toggleMobileSidebar = () => {
// //     setIsMobileSidebarOpen(!isMobileSidebarOpen);
// //   };

// //   // Load saved state from localStorage on initial mount
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       // Load token
// //       const storedToken = localStorage.getItem("token");
// //       setToken(storedToken);

// //       // Load other persisted states
// //       const storedIsFinished = localStorage.getItem("isFinished");
// //       const storedTemplate = localStorage.getItem("selectedTemplate");
// //       const storedFont = localStorage.getItem("selectedFont");
// //       const storedBgColor = localStorage.getItem("backgroundColor");
// //       const storedCurrentSection = localStorage.getItem("currentSection");
// //       const storedResumeData = localStorage.getItem("resumeData");

// //       if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
// //       if (storedTemplate) setSelectedTemplate(storedTemplate);
// //       if (storedFont) setSelectedFont(storedFont);
// //       if (storedBgColor) setBgColor(storedBgColor);
// //       if (storedCurrentSection)
// //         setCurrentSection(parseInt(storedCurrentSection));
// //       if (storedResumeData) setResumeData(JSON.parse(storedResumeData));
// //     }
// //   }, []);

// //   // Save states to localStorage whenever they change
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       localStorage.setItem("isFinished", JSON.stringify(isFinished));
// //       localStorage.setItem("selectedTemplate", selectedTemplate);
// //       localStorage.setItem("selectedFont", selectedFont);
// //       localStorage.setItem("headerColor", headerColor);
// //       localStorage.setItem("backgroundColor", backgroundColorss);
// //       localStorage.setItem("currentSection", currentSection.toString());
// //       localStorage.setItem("resumeData", JSON.stringify(resumeData));
// //     }
// //   }, [
// //     isFinished,
// //     selectedTemplate,
// //     selectedFont,
// //     headerColor,
// //     backgroundColorss,
// //     currentSection,
// //     resumeData,
// //   ]);

// //   // Prevent state reset on page refresh
// //   // useEffect(() => {
// //   //   const handleBeforeUnload = (e) => {
// //   //     e.preventDefault();
// //   //     e.returnValue = '';
// //   //   };

// //   //   window.addEventListener('beforeunload', handleBeforeUnload);

// //   //   return () => {
// //   //     window.removeEventListener('beforeunload', handleBeforeUnload);
// //   //   };
// //   // }, []);
// //   useEffect(() => {
// //     const savedState = localStorage.getItem("isSaved");
// //     if (savedState === "true") {
// //       setIsSaved(true);
// //     }
// //   }, []);
// //   useEffect(() => {
// //     // When resumeData changes, set isSaved to false
// //     if (isSaved) {
// //       setIsSaved(false);
// //       localStorage.setItem("isSaved", "false");
// //     }
// //   }, [resumeData]);

// //   useEffect(() => {
// //     const handleBeforeUnload = (e) => {
// //       if (!isSaved) {
// //         e.preventDefault();
// //         e.returnValue =
// //           "You have unsaved changes. Are you sure you want to leave?";
// //       }
// //     };

// //     window.addEventListener("beforeunload", handleBeforeUnload);

// //     return () => {
// //       window.removeEventListener("beforeunload", handleBeforeUnload);
// //     };
// //   }, [isSaved]);

// //   // Rest of the code remains the same...
// //   // (Keep all the existing code below this point unchanged)

// //   useEffect(() => {
// //     const path = window.location.pathname;
// //     const id = path.split("/").pop();
// //     setResumeId(id);
// //   }, []);

// //   const sections = [
// //     { label: "Personal Details", component: <PersonalInformation /> },
// //     { label: "Social Links", component: <SocialMedia /> },
// //     { label: "Summary", component: <Summary /> },
// //     { label: "Education", component: <Education /> },
// //     { label: "Experience", component: <WorkExperience /> },
// //     { label: "Projects", component: <Projects /> },
// //     {
// //       label: "Skills",
// //       component: Array.isArray(resumeData?.skills) ? (
// //         resumeData.skills.map((skill, index) => (
// //           <Skill title={skill.title} key={index} />
// //         ))
// //       ) : (
// //         <p>No skills available</p>
// //       ),
// //     },
// //     { label: "Languages", component: <Language /> },
// //     { label: "Certifications", component: <Certification /> },
// //   ];

// //   const handleProfilePicture = (e) => {
// //     const file = e.target.files[0];
// //     if (file instanceof Blob) {
// //       const reader = new FileReader();
// //       reader.onload = (event) => {
// //         setResumeData({ ...resumeData, profilePicture: event.target.result });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
// //   };

// //   // const handleNext = () => {
// //   //   if (currentSection === sections.length - 1) {
// //   //     setIsFinished(true);
// //   //   } else {
// //   //     setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
// //   //   }
// //   // };
// //   // Modify the handleNext function to preserve state
// //   const handleNext = async () => {
// //     await handleFinish();
// //     if (currentSection === sections.length - 1) {
// //       // Save current state before switching to finished mode
// //       localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
// //       localStorage.setItem("tempHeaderColor", headerColor);
// //       localStorage.setItem("tempBgColor", backgroundColorss);
// //       localStorage.setItem("tempFont", selectedFont);
// //       setIsFinished(true);
// //     } else {
// //       setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
// //     }
// //   };

// //   // Add effect to restore state when entering finished mode
// //   useEffect(() => {
// //     if (isFinished) {
// //       const tempResumeData = localStorage.getItem("tempResumeData");
// //       const tempHeaderColor = localStorage.getItem("tempHeaderColor");
// //       const tempBgColor = localStorage.getItem("tempBgColor");
// //       const tempFont = localStorage.getItem("tempFont");

// //       if (tempResumeData) setResumeData(JSON.parse(tempResumeData));
// //       if (tempHeaderColor) setHeaderColor(tempHeaderColor);
// //       if (tempBgColor) setBgColor(tempBgColor);
// //       if (tempFont) setSelectedFont(tempFont);
// //     }
// //   }, [isFinished]);

// //   // Add cleanup when component unmounts
// //   useEffect(() => {
// //     return () => {
// //       // Clean up temporary storage
// //       localStorage.removeItem("tempResumeData");
// //       localStorage.removeItem("tempHeaderColor");
// //       localStorage.removeItem("tempBgColor");
// //       localStorage.removeItem("tempFont");
// //     };
// //   }, []);

// //   const handlePrevious = async () => {
// //     await handleFinish();
// //     setCurrentSection((prev) => Math.max(prev - 1, 0));
// //   };

// //   const handleSectionClick = async (index) => {
// //     await handleFinish();
// //     setCurrentSection(index);
// //     setIsMobileMenuOpen(false);
// //   };

// //   const handleFontChange = (e) => {
// //     setSelectedFont(e.target.value);
// //   };

// //   const nextSection = () => {
// //     if (currentSection < sections.length - 1) {
// //       handleSectionClick(currentSection + 1);
// //     }
// //   };

// //   const prevSection = () => {
// //     if (currentSection > 0) {
// //       handleSectionClick(currentSection - 1);
// //     }
// //   };

// //   const pdfExportOptions = {
// //     paperSize: "A4",
// //     fileName: "resume.pdf",
// //     author: resumeData.firstName + " " + resumeData.lastName,
// //     creator: "ATSResume Builder",
// //     date: new Date(),
// //     scale: 0.7,
// //     forcePageBreak: ".page-break",
// //   };

// //   const downloadAsPDF = async () => {
// //     await handleFinish();
// //     let amount;

// //     if (userId == 121 || userId == 1) {
// //       amount = 1;
// //     } else {
// //       amount = 49;
// //     }

// //     // Fixed price

// //     try {
// //       // Make the payment API call
// //       const payload = {
// //         amount,
// //         ResumeId: resumeId, // Make sure resumeId is defined in your component
// //         Token: token || "", // Make sure token is defined in your component
// //       };

// //       const response = await axios.post(
// //         "https://api.abroadium.com/api/jobseeker/paypal/create-payment",
// //         payload,
// //         {
// //           headers: {
// //             Authorization: token,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       const data = response.data;
// //       console.log(data, "data");
// //       if (data && data.data) {
// //         // Store the order ID for later verification if needed
// //         const orderId = data.order_id;
// //         localStorage.setItem("orderid", orderId);

// //         // Redirect the user to PayPal URL to complete payment
// //         if (data.data) {
// //           window.location.href = data.data; // Redirect to PayPal
// //         } else {
// //           console.error("Payment URL not found");
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Payment Error:", error);
// //       // Handle error (show error message to user)
// //     }
// //   };

// //   useEffect(() => {
// //     if (PayerID) {
// //       verifyPayment();
// //     }
// //   });
// //   const verifyPayment = async () => {
// //     try {
// //       const orderId = localStorage.getItem("orderid");
// //       const token = localStorage.getItem("token");

// //       if (orderId && token && PayerID) {
// //         const response = await axios.get(
// //           `https://api.abroadium.com/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
// //           {
// //             headers: {
// //               Authorization: token,
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );

// //         if (response.data.status === "success") {
// //           setPaymentVerified(true);
// //           toast.success("Payment verified successfully!");

// //           localStorage.removeItem("orderid");

// //           // If verification is successful, trigger PDF download
// //           if (pdfExportComponent.current) {
// //             pdfExportComponent.current.save();
// //           }
// //         } else {
// //           toast.error("Payment verification failed. Please try again.");
// //           router.push("/payment-failed");
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Payment Verification Error:", error);
// //       toast.error(
// //         error?.response?.data?.message || "Payment verification failed"
// //       );
// //       router.push("/payment-failed");
// //     }
// //   };

// //   const handleFinish = async () => {
// //     if (!resumeData) return;

// //     const templateData = {
// //       templateData: {
// //         name: resumeData.name || "",
// //         position: resumeData.position || "",
// //         contactInformation: resumeData.contact || "",
// //         email: resumeData.email || "",
// //         address: resumeData.address || "",
// //         profilePicture: resumeData.profilePicture || "",
// //         socialMedia:
// //           resumeData.socialMedia?.map((media) => ({
// //             socialMedia: media.platform || "",
// //             link: media.link || "",
// //           })) || [],
// //         summary: resumeData.summary || "",
// //         education:
// //           resumeData.education?.map((edu) => ({
// //             school: edu.school || "",
// //             degree: edu.degree || "",
// //             startYear: edu.startYear || "",
// //             endYear: edu.endYear || "",
// //           })) || [],
// //         workExperience:
// //           resumeData.workExperience?.map((exp) => ({
// //             company: exp.company || "",
// //             position: exp.position || "",
// //             description: exp.description || "",
// //             KeyAchievements: Array.isArray(exp.keyAchievements)
// //               ? exp.keyAchievements
// //               : [exp.keyAchievements || ""],
// //             startYear: exp.startYear || "",
// //             endYear: exp.endYear || "",
// //           })) || [],
// //         projects:
// //           resumeData.projects?.map((project) => ({
// //             title: project.title || "",
// //             link: project.link || "",
// //             description: project.description || "",
// //             keyAchievements: Array.isArray(project.keyAchievements)
// //               ? project.keyAchievements
// //               : [project.keyAchievements || ""],
// //             startYear: project.startYear || "",
// //             endYear: project.endYear || "",
// //             name: project.name || "",
// //           })) || [],
// //         skills: Array.isArray(resumeData.skills)
// //           ? resumeData.skills.map((skill) => ({
// //               title: skill.title || "",
// //               skills: skill.skills || [],
// //             }))
// //           : [],
// //         languages: resumeData.languages || [],
// //         certifications: resumeData.certifications || [],
// //         // Add template information
// //         templateDetails: {
// //           templateId: selectedTemplate,
// //           backgroundColor: backgroundColorss || "",
// //           font: selectedFont || "Ubuntu",
// //         },
// //       },
// //     };
// //     console.log(templateData, "templateData");

// //     try {
// //       const id = router.query.id || localStorage.getItem("resumeId");
// //       if (!id) {
// //         console.error("Resume ID not found.");
// //         return;
// //       }

// //       const url = `https://api.abroadium.com/api/jobseeker/resume-update/${id}`;
// //       const response = await axios.put(url, templateData, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: token,
// //         },
// //       });

// //       console.log("Resume updated successfully:", response.data);
// //       if (response.data.code === 200 || response.data.status === "success") {
// //         setIsSaved(true);
// //         localStorage.setItem("isSaved", "true");
// //         toast.success(response.data.message || "Resume saved Successfully");
// //       } else {
// //         toast.error(response.data.error || "Error while saving the Resume");
// //       }
// //     } catch (error) {
// //       toast.error(error?.message || "Error !!");
// //       console.error("Error updating resume:", error);
// //     }
// //   };

// //   console.log(resumeData, "Resumedata");

// //   const MobileNavigation = () => (
// //     <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 md:hidden">
// //       <div className="flex justify-between items-center">
// //         <button
// //           onClick={handlePrevious}
// //           disabled={currentSection === 0}
// //           className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
// //         >
// //           Previous
// //         </button>
// //         <span className="text-sm font-medium">
// //           {sections[currentSection].label}
// //         </span>
// //         <button
// //           onClick={handleNext}
// //           className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
// //         >
// //           {currentSection === sections.length - 1 ? "Finish" : "Next"}
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   const MobileMenu = () => (
// //     <div className="md:hidden">
// //       {isMobileMenuOpen && (
// //         <div className="fixed inset-0 bg-white z-40 p-4 pt-16">
// //           <div className="overflow-y-auto h-full">
// //             {sections.map((section, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => handleSectionClick(index)}
// //                 className={`w-full p-3 mb-2 rounded-lg text-left ${
// //                   currentSection === index
// //                     ? "bg-blue-950 text-white"
// //                     : "bg-gray-100 text-blue-950"
// //                 }`}
// //               >
// //                 {section.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// //   const handleBackToEditor = async () => {
// //     await handleFinish();
// //     // Save current state before switching back
// //     localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
// //     localStorage.setItem("tempHeaderColor", headerColor);
// //     localStorage.setItem("tempBgColor", backgroundColorss);
// //     localStorage.setItem("tempFont", selectedFont);
// //     setIsFinished(false);
// //     setCurrentSection(0); // Optionally reset to first section
// //   };

// //   // Return your existing JSX
// //   return (
// //     <ResumeContext.Provider
// //       value={{
// //         resumeData,
// //         setResumeData,
// //         handleProfilePicture,
// //         handleChange,
// //         headerColor,
// //         backgroundColorss,
// //         selectedFont,
// //       }}
// //     >
// //       <Meta
// //         title="ATSResume | Get hired with an ATS-optimized resume"
// //         description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
// //         keywords="ATS-friendly, Resume optimization..."
// //       />

// //       <div className="w-screen bg-gray-50">
// //         {/* Mobile Components */}
// //         <MobileMenu />

// //         {!isFinished ? (
// //           <div className="w-screen bg-gray-50 flex flex-col">
// //             <LoadUnload />
// //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
// //               <MyResume />
// //             </Modal>
// //             {/* Form Navigation Bar */}
// //             <div
// //               className="w-full bg-gray-200 p-4 shadow-sm"
// //               style={{ backgroundColor: "#002a48" }}
// //             >
// //               <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
// //                 {/* Navigation Buttons */}
// //                 <div className="flex w-full lg:w-auto gap-4">
// //                   <Link href="https://abroadium-arbuild-fe.vercel.app/dashboard">
// //                     <button
// //                       type="button"
// //                       className=" py-2 px-6 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
// //                     >
// //                       Back to Dashboard
// //                     </button>
// //                   </Link>
// //                   <button
// //                     type="button"
// //                     onClick={handlePrevious}
// //                     disabled={currentSection === 0}
// //                     className="w-40 px-6 py-2 rounded-lg  bg-gray-600 text-white font-medium transition hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
// //                   >
// //                     Previous
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={handleNext}
// //                     className="w-40 px-6 py-2 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
// //                   >
// //                     {currentSection === sections.length - 1 ? "Finish" : "Next"}
// //                   </button>
// //                 </div>

// //                 {/* Controls Group */}
// //                 <div className="hidden lg:flex items-center gap-4">
// //                   <select
// //                     value={selectedFont}
// //                     onChange={handleFontChange}
// //                     className="rounded-lg border-2 m-2 border-blue-800 px-6 py-2 font-bold bg-white text-blue-800 w-40 h-10"
// //                   >
// //                     <option value="Ubuntu">Ubuntu</option>
// //                     <option value="Calibri">Calibri</option>
// //                     <option value="Georgia">Georgia</option>
// //                     <option value="Roboto">Roboto</option>
// //                     <option value="Poppins">Poppins</option>
// //                   </select>

// //                   <div className="flex items-center gap-4">
// //                     <ColorPicker
// //                       selectedColor={headerColor}
// //                       onChange={setHeaderColor}
// //                     />
// //                     <ColorPickers
// //                       selectmultiplecolor={backgroundColorss}
// //                       onChange={setBgColor}
// //                     />
// //                     <TemplateSelector
// //                       selectedTemplate={selectedTemplate}
// //                       setSelectedTemplate={setSelectedTemplate}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Sticky Top Navigation */}
// //             <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
// //               <div className="hidden md:flex justify-center items-center p-4">
// //                 <nav className="bg-gray-100 rounded-lg p-2">
// //                   <div className="flex items-center">
// //                     <button
// //                       onClick={() => prevSection()}
// //                       className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
// //                       disabled={currentSection === 0}
// //                     >
// //                       {/* Chevron Left Icon Here */}
// //                     </button>

// //                     <div className="flex-1 overflow-x-auto scrollbar-hide ">
// //                       <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
// //                         {sections.map((section, index) => (
// //                           <li
// //                             key={index}
// //                             className={`px-4 py-2 cursor-pointer transition rounded-lg border-2 ${
// //                               currentSection === index
// //                                 ? "border-blue-800 font-semibold bg-blue-950 text-white"
// //                                 : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
// //                             }`}
// //                             onClick={() => handleSectionClick(index)}
// //                           >
// //                             {section.label}
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     </div>

// //                     <button
// //                       onClick={() => nextSection()}
// //                       className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
// //                       disabled={currentSection === sections.length - 1}
// //                     >
// //                       {/* Chevron Right Icon Here */}
// //                     </button>
// //                   </div>
// //                 </nav>
// //               </div>
// //             </div>

// //             {/* Main Content */}
// //             <div
// //               className="flex flex-col md:flex-row flex-grow "
// //               style={{ backgroundColor: "#002a48" }}
// //             >
// //               {/* Form Content */}
// //               <main className=" w-[40%] mx-auto ">
// //                 <form>{sections[currentSection].component}</form>
// //               </main>

// //               {/* Preview Panel */}
// //               <aside className="w-[60%] hidden md:block w-3/2 min-h-screen border-l bg-gray-50">
// //                 <div className="sticky top-20 p-4">
// //                   <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
// //                     <Preview selectedTemplate={selectedTemplate} />
// //                   </PDFExport>
// //                 </div>
// //               </aside>
// //             </div>

// //             {/* Mobile Navigation */}
// //             <MobileNavigation />
// //           </div>
// //         ) : (
// //           // Finished State
// //           <div className=" flex flex-col">
// //             {/* Mobile Finished Controls */}
// //             <div className="flex flex-col gap-4 p-2 md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
// //               {/* <LoaderButton
// //                 isLoading={isLoading}
// //                 onClick={handleFinish}
// //                 className="bg-blue-950 text-white px-4 py-2 rounded-lg"
// //               >
// //                 Save Resume
// //               </LoaderButton> */}
// //               <button
// //                 onClick={handleFinish}
// //                 className="bg-blue-950 text-white px-6 py-2  rounded-lg"
// //               >
// //                 Save Resume
// //               </button>
// //               <button
// //                 onClick={downloadAsPDF}
// //                 className=" bg-yellow-500 text-black px-6 py-2 rounded-lg"
// //               >
// //                 Pay & Download
// //               </button>
// //               <button
// //                 onClick={handleBackToEditor}
// //                 className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
// //               >
// //                 Back to Previous
// //               </button>
// //             </div>

// //             {/* Desktop Controls - Hidden on Mobile */}
// //             <div
// //               style={{ backgroundColor: "#002a48" }}
// //               className="hidden md:flex w-screen px-8 py-4 justify-between items-center  shadow"
// //             >
// //               <div className="flex gap-4">
// //                 <select
// //                   value={selectedFont}
// //                   onChange={handleFontChange}
// //                   className="rounded-lg border-2 m-2 border-blue-800 px-6 py-2 font-bold bg-white text-blue-800 w-40"
// //                 >
// //                   <option value="Ubuntu">Ubuntu</option>
// //                   <option value="Calibri">Calibri</option>
// //                   <option value="Georgia">Georgia</option>
// //                   <option value="Roboto">Roboto</option>
// //                   <option value="Poppins">Poppins</option>
// //                 </select>
// //                 <ColorPicker
// //                   selectedColor={headerColor}
// //                   onChange={setHeaderColor}
// //                 />
// //                 <ColorPickers
// //                   selectmultiplecolor={backgroundColorss}
// //                   onChange={setBgColor}
// //                 />
// //                 <TemplateSelector
// //                   selectedTemplate={selectedTemplate}
// //                   setSelectedTemplate={setSelectedTemplate}
// //                 />
// //               </div>
// //               <div className="flex gap-4">
// //                 <button
// //                   onClick={handleFinish}
// //                   className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
// //                 >
// //                   Save Resume
// //                 </button>
// //                 <button
// //                   onClick={downloadAsPDF}
// //                   className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400"
// //                 >
// //                   Pay & Download
// //                 </button>
// //                 <button
// //                   onClick={handleBackToEditor}
// //                   className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
// //                 >
// //                   Back to Previous
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Preview */}
// //             <div className="pb-28">
// //               <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
// //                 <Preview selectedTemplate={selectedTemplate} />
// //               </PDFExport>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </ResumeContext.Provider>
// //   );
// // }

// // export { ResumeContext };

// import MobileBuilder from './mobilebuilder'
// import Navbar from './Navbar/Navbar'
// import WebBuilder from "./webbuilder"
// export default function Builder() {

//   return(
//     <>
//     <div className="block md:hidden">
//     <MobileBuilder />
//     </div>
//     <div className="hidden md:block">
//     <WebBuilder />
//     </div>
//     </>
//   )
// }

import MobileBuilder from "./mobilebuilder";
import Navbar from "./Navbar/Navbar";
import WebBuilder from "./webbuilder";

export default function Builder() {
  return (
    <>
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        {/* Mobile Builder */}
        <div className="block md:hidden w-full">
          {/* <Navbar/> */}
          <MobileBuilder />
        </div>

        {/* Web Builder */}
        <div className="hidden md:block w-screen">
          {/* <Navbar/> */}
          <WebBuilder />
        </div>
      </div>
    </>
  );
}
