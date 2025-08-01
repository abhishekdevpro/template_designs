"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Upload } from "lucide-react"; // Replaced SVG with lucide-react icons

export default function FileUploadStep({ onNext, onBack }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    // Mocking an API call
    /*
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/resume-upload/12345`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setUploadSuccess(true);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
    }
    */

    // Simulate upload success
    setTimeout(() => {
      setUploadProgress(100);
      setUploadSuccess(true);
      toast.success("File uploaded successfully");
      setIsUploading(false);
    }, 2000);
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
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Upload Your Resume</h2>
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
            <div className="text-lg font-medium">Uploading your resume...</div>
            <div className="w-64 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
          </div>
        ) : (
          <>
            <p className="text-xl font-medium mb-4">
              Drag and drop your resume here
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

      <div className="flex justify-between mt-12">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!uploadSuccess || isUploading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
