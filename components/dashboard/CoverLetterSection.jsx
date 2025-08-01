import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import FullScreenLoader from "../ResumeLoader/Loader";
import Button from "../buttonUIComponent";

const CoverLetterSection = ({ letterCount }) => {
  const [showLoader, setShowLoader] = useState(false); // State to control loader visibility
  const router = useRouter();

  const handleClick = () => {
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      router.push("/dashboard/cvletterlist"); // Navigate after 2 seconds
    }, 2000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 w-full">
      {/* Show loader if `showLoader` is true */}
      {showLoader && <FullScreenLoader />}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg shrink-0">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your Cover Letters</h3>
            {letterCount !== undefined && (
              <p className="text-gray-600 text-sm md:text-base">
                You have {letterCount} cover letter
                {letterCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleClick}
          className="px-4 py-2 md:px-6 md:py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 text-sm md:text-base whitespace-nowrap self-start sm:self-auto mt-2 sm:mt-0"
        >
          View Cover Letters
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterSection;
