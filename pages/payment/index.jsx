import { useState } from "react";
import {
  CheckCircle,
  DollarSign,
  Bell,
  Clock,
  RefreshCw,
  XCircle,
  Loader,
  Lock,
} from "lucide-react";

import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import { pricingData } from "../../components/Data/PlanData";
import Button from "../../components/buttonUIComponent";
import { toast } from "react-toastify";
import axios from "axios";
// Pricing data from your JSON

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handleCheckout = async () => {
    setShowPopup(false);
    setLoading(true);
    const token = localStorage.getItem("token");
    const plan = pricingData[selectedPlan];

    try {
      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/payment/checkout`,
        {
          plan_id: plan.planId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        if (response.data?.payment_url) {
          toast.success("Payment successful! Redirecting...");
          window.location.href = response.data.payment_url;
        } else {
          console.error("No URL found in response:", response.data);
          toast.error("Unexpected response from the server. No URL returned.");
        }
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  // Extract plans from the pricing data
  const plans = ["freePlan", "singlePass", "aiProMonth"];

  // Get features for a plan
  const getPlanFeatures = (planId) => {
    const plan = pricingData[planId];
    const features = [];

    for (let i = 1; i <= 20; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }

    return features;
  };

  // Check if selected plan is free
  const isFreePlan = selectedPlan === "freePlan";

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto  bg-gradient-to-b from-white to-blue-100">
        {/* Intro Section */}
        <div className="bg-success/20 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Cast a wider net - 10x your job applications
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scours millions of jobs to continuously find
            and apply to relevant job openings until you&apos;re hired.
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Kudos! You&apos;re one step closer to success 🎉
        </h2>

        {/* Pricing Section Title */}
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">{pricingData.title}</h2>
          <p className="text-gray-600 mt-2">{pricingData.subtitle}</p>
          <p className="text-gray-500 mt-1">{pricingData.intro}</p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            {/* Pricing Plans */}
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {plans.map((planId) => {
                const plan = pricingData[planId];
                //  {console.log(plan,"plan")}
                // if (plan.title === "Free Plan") return null;
                return (
                  <div
                    key={planId}
                    className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative ${
                      selectedPlan === planId
                        ? "border-success bg-success/20"
                        : "bg-white"
                    }`}
                    onClick={() => handlePlanSelection(planId)}
                  >
                    {/* {plan.bestValue === "true" && (
                      <div className="absolute -top-3 right-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                        {t(pricingData.bestValueLabel)}
                      </div>
                    )} */}

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      <input
                        type="checkbox"
                        checked={selectedPlan === planId}
                        onChange={() => {}}
                        className="h-5 w-5 text-success/90"
                      />
                    </div>

                    <div className="text-2xl font-bold mb-1">
                      {plan.price === "0"
                        ? pricingData.freeLabel
                        : `CAD${plan.price}${
                            plan.billingCycle !== "single"
                              ? `/${
                                  plan.billingCycle === "Month"
                                    ? "mo"
                                    : "one-time"
                                }`
                              : ""
                          }`}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {plan.billingCycle}
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 text-sm">
                        {/* {getPlanFeatures(planId).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-success/90 mr-2 mt-1 flex-shrink-0" />
                            <XCircle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />

                            <span>{feature}</span>
                          </li>
                        ))} */}
                        {getPlanFeatures(planId).map((feature, idx) => (
                          <li key={idx} className="flex items-start mb-2">
                            {feature.available ? (
                              <CheckCircle className="h-4 w-4 text-success/90 mr-2 mt-1 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            )}
                            <span>{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Plan Features */}
            {/* <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <h3 className="font-semibold mb-4">{t("Selected Plan Features")}</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {getPlanFeatures(selectedPlan).map((feature, idx) => (
                  <li key={idx}>{t(feature)}</li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* Features & Payment Section */}
          {/* Features & Payment Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Features List */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                All subscription features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature
                  icon={<CheckCircle className="text-primary" />}
                  title="AI-Powered Job Matching"
                  description="Get real-time job recommendations tailored to your skills and experience."
                />
                <Feature
                  icon={<RefreshCw className="text-primary" />}
                  title="ATS-Optimized Resumes"
                  description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS). "
                />
                <Feature
                  icon={<Bell className="text-primary" />}
                  title="Instant Job Alerts "
                  description="Stay ahead with real-time notifications about new job openings that match your profile."
                />
                <Feature
                  icon={<Clock className="text-primary" />}
                  title="Expert Resume Assistance"
                  description="Get personalized resume reviews and improvements from industry professionals."
                />
                <Feature
                  icon={<DollarSign className="text-primary" />}
                  title="Career Community & Networking"
                  description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
                />
                <Feature
                  icon={<CheckCircle className="text-primary" />}
                  title="One-Click Applications"
                  description="Apply faster and more efficiently with seamless, single-click job applications."
                />
              </div>
              <div className=" mt-6">
                {isFreePlan ? (
                  <Button
                    disabled={true}
                    className="w-full bg-gray-400 text-white text-lg font-semibold py-3 rounded-xl cursor-not-allowed opacity-50"
                  >
                    Free Plan Selected
                  </Button>
                ) : (
                  <Button
                    onClick={handleConfirmClick}
                    disabled={loading}
                    className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-xl hover:bg-primary/90 flex items-center justify-center"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <Loader className="mr-2 animate-spin" size={18} />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="mr-2" size={18} />
                        Proceed to Secure Checkout
                      </>
                    )}
                  </Button>
                )}
                <p className="text-gray-600 text-center mt-4">
                  <strong>Got questions?</strong> Contact our customer support.
                </p>
                <p className="text-gray-600 text-center">
                  You may cancel via email at{" "}
                  <a
                    href="mailto:customersupport@Abroadium.com"
                    className="text-primary underline"
                  >
                    customersupport@Abroadium.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Payment Section */}
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Confirm Payment</h3>
            <p className="text-gray-700 mb-6">
              You are about to proceed with the payment for{" "}
              {pricingData[selectedPlan].title} plan for CAD
              {pricingData[selectedPlan].price}
              {pricingData[selectedPlan].billingCycle === "Month" ? "/mo" : ""}.
              Would you like to continue?
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                onClick={handleCancelPopup}
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition duration-200 flex items-center justify-center"
              >
                <Lock className="mr-2" size={16} />
                Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <div className="flex space-x-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
