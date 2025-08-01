"use client";

import { useRouter } from "next/router";
import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { Upload, File } from "lucide-react"; // Replaced SVG with lucide-react icons
import drive from "../../public/assets/google-drive.png";
import { ResumeContext } from "../context/ResumeContext";
import { SaveLoader } from "../ResumeLoader/SaveLoader";

export default function FileUploadStep({ onNext, onBack, onChange, value }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [resumeId, setResumeId] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to track upload success
  const router = useRouter();
  const { setResumeData } = useContext(ResumeContext);
  const { id } = router.query;

  const handleUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    setIsUploading(true);
    setShowLoadingAnimation(true);
    setUploadSuccess(false); // Reset upload success state before uploading

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        setIsUploading(false);
        setShowLoadingAnimation(false);
        return;
      }

      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/resume-upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            // toast.info(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      const resumeData = response.data.data[0];

      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setIsUploading(false);
        setShowLoadingAnimation(false);
        return;
      }

      setResumeId(resumeData.id);
      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);

      localStorage.setItem(
        "resumeData",
        JSON.stringify(parsedData.templateData)
      );
      localStorage.setItem("resumeId", resumeData.id);
      localStorage.setItem("location", resumeData.file_path);

      // Set uploadSuccess to true once upload is successful
      setUploadSuccess(true);

      toast.success("File uploaded successfully");
      onChange(file);
      setIsUploading(false);
      setShowLoadingAnimation(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "File upload failed");
      setIsUploading(false);
      setShowLoadingAnimation(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-gradient-to-b from-white to-blue-100">
      <header className="bg-primary text-white px-4 py-6 flex items-center justify-between"></header>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 ">
        {showLoadingAnimation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <SaveLoader loadingText="Processing your resume..." />
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Upload Your Resume
          </h2>
          <p className="mt-3 text-gray-600">
            We accept PDF files for better parsing accuracy
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
          ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }
          ${isUploading ? "cursor-not-allowed opacity-75" : ""}`}
        >
          <input {...getInputProps()} disabled={isUploading} />
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>

          {isUploading ? (
            <div className="space-y-4">
              <div className="text-lg font-medium">
                Uploading your resume...
              </div>
              <div className="w-64 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">
                {uploadProgress}% complete
              </p>
            </div>
          ) : (
            <>
              <p className="text-xl font-medium mb-4">
                {value ? value.name : "Drag and drop your resume here"}
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Select PDF File
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Maximum file size: 10MB
              </p>
            </>
          )}
        </div>
        {/* 
      <div className="flex items-center justify-center space-x-6">
        <div className="h-px bg-gray-300 w-24"></div>
        <span className="text-gray-500 font-medium">OR</span>
        <div className="h-px bg-gray-300 w-24"></div>
      </div> */}

        {/* <div className="flex items-center justify-center space-x-6">
        <button 
         disabled
        className="flex items-center px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors">
          <Image src={drive} alt="Google Drive" className="w-6 h-6 mr-3" />
          <span className="font-medium">Google Drive</span>
        </button>
      </div> */}

        <div className="flex justify-between mt-12">
          <button
            onClick={onBack}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => router.push(`/dashboard/aibuilder/${resumeId}`)}
            disabled={!uploadSuccess || isUploading} // Button is enabled only after successful upload
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
