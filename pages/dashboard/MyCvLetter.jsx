"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download, Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import Button from "../../components/buttonUIComponent";
const MyCvLetter = () => {
  const [coverletters, setCoverLetters] = useState([]);
  const [deletecoverletterId, setDeletecoverletterId] = useState(null);
  const [coverletterId, setcoverletterId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCoverLetter, setCurrentCoverLetter] = useState(null);
  const [newCoverLetterTitle, setNewCoverLetterTitle] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://api.abroadium.com/api/jobseeker/coverletter", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const coverletters = response?.data?.data || [];
          if (coverletters.length === 0) {
            toast.info("No coverletters available.");
          }
          setCoverLetters(coverletters);
        })
        .catch((error) => {
          console.error("Error fetching cover letter list:", error);
          toast.error("Failed to fetch coverletters.");
        });
    }
  }, []);
  const handleEdit = (coverletterId) => {
    setcoverletterId(coverletterId);
    router.push(`/dashboard/cvaibuilder/${coverletterId}`);
  };
  const handleDownload = async (coverletterId) => {
    setcoverletterId(coverletterId);
    const apiUrl = `https://api.abroadium.com/api/jobseeker/download-coverletter/${coverletterId}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${coverletterId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download the file. Please try again later.");
    }
  };
  const handleDeleteCvLetter = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `https://api.abroadium.com/api/jobseeker/coverletter/${deletecoverletterId}`,
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Resume deleted successfully");
        setIsDeleteModalOpen(false);
        setCoverLetters(
          coverletters.filter(
            (coverletter) => coverletter.id !== deletecoverletterId
          )
        );
      } catch (error) {
        console.error("Error deleting cover letter :", error);
        toast.error("Failed to delete cover letter ");
      }
    }
  };
  const handleOpenEditModal = (coverletter) => {
    setCurrentCoverLetter(coverletter);
    setNewCoverLetterTitle(coverletter.cover_letter_title);
    setIsEditModalOpen(true);
  };

  const handleUpdateCvLetterTitle = () => {
    const token = localStorage.getItem("token");
    if (token && currentCoverLetter) {
      axios
        .put(
          `https://api.abroadium.com/api/jobseeker/coverletter-details/${currentCoverLetter.id}`,
          { cover_letter_title: newCoverLetterTitle },
          { headers: { Authorization: token } }
        )
        .then(() => {
          toast.success("Cover Letter title updated successfully.");
          setIsEditModalOpen(false);
          setCoverLetters((prevCoverLetters) =>
            prevCoverLetters.map((coverletter) =>
              coverletter.id === currentCoverLetter.id
                ? { ...coverletter, cover_letter_title: newCoverLetterTitle }
                : coverletter
            )
          );
        })
        .catch((error) => {
          console.error("Error updating cover letter title:", error);
          toast.error("Failed to update cover letter title.");
        });
    }
  };
  const router = useRouter();
  const handleCreate = () => {
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {showLoader && <FullScreenLoader />}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Cover Letters</h1>
        <Button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-[#002a48] text-white rounded-lg  transition-colors duration-200 font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-scroll">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sr. no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  My Cover Letters
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Modification
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coverletters.length > 0 ? (
                coverletters.map((coverletter, index) => (
                  <tr key={coverletter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">
                          {coverletter.cover_letter_title}
                        </span>
                        <Button
                          onClick={() => handleOpenEditModal(coverletter)}
                          className="text-primary "
                        >
                          🖍
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* {coverletter.updated_at} */}
                      {new Date(coverletter.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* {coverletter.created_at} */}
                      {new Date(coverletter.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => handleEdit(coverletter.id)}
                          className="text-primary "
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() => {
                            setIsDeleteModalOpen(true);
                            setDeletecoverletterId(coverletter.id);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() => handleDownload(coverletter.id)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <Download className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Please Upload Cover Letter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to delete this cover letter?
            </h2>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteCvLetter}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Cover Letter Title
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002a48]"
              value={newCoverLetterTitle}
              onChange={(e) => setNewCoverLetterTitle(e.target.value)}
              placeholder="Enter new cover letter title"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCvLetterTitle}
                className="px-4 py-2 text-sm font-medium text-white bg-[#002a48] rounded-md "
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCvLetter;
