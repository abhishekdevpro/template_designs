import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'; // Ensure correct import
import GoogleDrive from '../public/assets/google-drive.png';
import drag from '../public/assets/drag.png';
import { ResumeContext } from "../components/context/ResumeContext";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    if (selectedFile.size > 5000000) {
      console.error("File too large.");
      return;
    }

    if (!selectedFile.name.endsWith('.pdf')) {
      console.error("Invalid file type. Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);

    // Placeholder for PDF file handling
    console.log(`Uploaded file: ${selectedFile.name}`);
    router.push("/builder");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBrowseClick = () => {
    document.getElementById("fileUpload").click();
  };

  const handleNextClick = () => {
    if (resumeData) {
      router.push("/builder");
    } else {
      console.error("No resume data loaded.");
    }
  };

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-lg border border-dashed border-blue-500 p-8 rounded-lg bg-white shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">How do you want to upload your resume?</h1>

        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="w-full mb-4 md:w-2/3 md:mb-0">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border border-dashed border-blue-500 p-6 rounded-lg h-40 flex items-center justify-center cursor-pointer hover:bg-blue-50 w-full"
            >
              {file ? (
                <span className="text-gray-500">{file.name}</span>
              ) : (
                <span className="text-gray-500">Drag and drop a file here</span>
              )}
            </div>

            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />

            <button
              onClick={handleBrowseClick}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse
            </button>
          </div>

          <div className="flex flex-col space-y-4 w-full md:w-1/3">
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full">
              <Image src={GoogleDrive} width={24} height={24} alt="Google Drive" />
              <span className="text-gray-700 whitespace-nowrap">Google Drive</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full">
              <Image src={drag} alt="Dropbox" width={24} height={24} />
              <span className="text-gray-700 whitespace-nowrap">Dropbox</span>
            </button>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4">Files we can read: PDF</p>
      </div>

      <div className="mt-6 w-full max-w-screen-lg px-4 flex justify-between">
        <button
          className="w-1/3 px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="w-1/3 px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
