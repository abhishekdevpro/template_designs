import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import LetterDetails from "./LetterDetails";
import IntroductionAndBodyForm from "./IntroductionAndBodyForm";
import ClosingGratitudeAndSignatureForm from "./ClosingGratitudeAndSignatureForm";
import { toast } from "react-toastify";

const CoverLetterEditor = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { component: <PersonalInformation /> },
    { component: <LetterDetails /> },
    { component: <IntroductionAndBodyForm /> },
    {
      component: <ClosingGratitudeAndSignatureForm />,
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleFinish =()=>{
    toast.info("Please Save your Cover letter")
    // console.log("finish");
  }

  return (
    <div className="">
      {/* Render Current Step */}
      {steps[step].component}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className={`px-4 py-2 rounded-lg ${
            step === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={step === steps.length - 1 ? handleFinish : nextStep}
          className={`px-4 py-2 rounded-lg ${
            step === steps.length - 1
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {step === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
