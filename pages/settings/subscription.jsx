import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../components/buttonUIComponent";
export default function Subscription() {
  const [status, setStatus] = useState("Inactive");
  const [accountId, setAccountId] = useState();
  const [userData, setUserData] = useState(null); // Store current plan
  useEffect(() => {
    setAccountId(localStorage.getItem("ID"));
  }, []);

  const handleCancelSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://api.abroadium.com/api/user/payment/cancel-subscription",
        {}, // Empty body if API doesn't require data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Add Bearer if required
          },
        }
      );

      if (response.status === 200) {
        // Successfully canceled the subscription
        toast.success("Your subscription has been canceled.");
      } else {
        toast.error(
          response.data.message || "Failed to cancel the subscription."
        );
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Remove token if expired
        window.location.href = "/login"; // Redirect to login page
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get(
          "https://api.abroadium.com/api/jobseeker/user-profile",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const userData = response.data.data; // Get user data from API
          setUserData(userData.personal_details); // Store user data
          setStatus(userData.is_active_plan ? "Active" : "Inactive"); // Set status correctly
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setStatus("Inactive"); // Set status to Inactive on error
      }
    };

    fetchUserProfile();
  }, []);
  const planName = {
    1: "Free",
    2: "Pay & Download",
    3: "AI Pro Month",
    // 4: "AI Pro Yearly",
  };

  const currentPlan = userData?.plan_id
    ? planName[String(userData.plan_id)]
    : "Free";
  // console.log(userData,"/////");

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-10 max-w-5xl mx-auto bg-gradient-to-b from-white to-blue-100">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Sidebar (Takes full width on mobile) */}
          <div className="w-full md:w-1/4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="p-6 bg-white ">
              <h3 className="text-xl font-semibold mb-6">Subscription</h3>

              {/* Help & Support Box */}
              <div className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="w-full md:w-1/2">
                  <p className="font-semibold text-gray-800">
                    Need help or want to change your subscription?
                  </p>
                  <p className="mt-2 text-gray-700">Contact us at:</p>
                  <ul className="list-disc ml-5 text-gray-700">
                    <li className="text-[15px]">
                      📧 customersupport@Abroadium.com
                    </li>
                  </ul>
                </div>

                {/* Vertical Divider (Hidden on small screens) */}
                <div className="hidden md:block border-l border-gray-300 h-24 mx-6"></div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <p className="font-semibold text-gray-800">
                    Available days a week:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700">
                    <li>Monday-Friday: 8 AM - 8 PM (IST)</li>
                    <li>Saturday: 8 AM - 5 PM (IST)</li>
                  </ul>
                </div>
              </div>

              {/* Account ID */}
              <div className="py-4 border-b border-gray-300">
                <p className="font-semibold text-gray-900">
                  Account ID:{" "}
                  <span className="text-gray-600 font-medium">
                    {accountId || 618744350}
                  </span>
                </p>
              </div>

              {/* Subscription Details */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  Subscription details
                </h4>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3">
                  <p className="text-gray-700">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        status === "Active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </p>

                  <div className="flex space-x-4">
                    <Link href="/payment">
                      <Button
                        variant="primary"
                        className="mt-3 md:mt-0 px-4 py-2  text-white rounded-full"
                      >
                        Upgrade
                      </Button>
                    </Link>
                    <Button
                      onClick={handleCancelSubscription}
                      disabled={
                        userData?.plan_id === 1 || !userData?.is_active_plan
                      } // Disable if Free Plan
                      className={`mt-3 md:mt-0 px-4 py-2 rounded-full ${
                        userData?.plan_id === 1 || !userData?.is_active_plan
                          ? "bg-gray-400 cursor-not-allowed" // Disabled styling
                          : "bg-red-600 text-white hover:bg-red-700" // Active styling
                      }`}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
                {/* <p className="text-gray-700">
                  Current plan: {userData?.plan_id || "N/A"}
                </p> */}
                <p className="text-sm text-gray-600">
                  Current Plan:{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      currentPlan === "Free"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {currentPlan}
                  </span>
                </p>

                <p className="mt-4 text-gray-700">
                  For more information or changes to your subscription, contact
                  us at
                  <a
                    href="mailto: customersupport@Abroadium.com"
                    className="text-blue-600 cursor-pointer"
                  >
                    {" "}
                    customersupport@Abroadium.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
