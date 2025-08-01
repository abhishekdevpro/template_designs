// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "../Navbar/Navbar";

// export default function Notification() {
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [smsNotifications, setSmsNotifications] = useState(false);
//   const [marketingNotifications, setMarketingNotifications] = useState(true);

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 md:p-10 max-w-5xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
//         <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
//           {/* Sidebar (Takes full width on small screens) */}
//           <div className="md:w-1/4 w-full">
//             <Sidebar />
//           </div>

//           {/* Main Content */}
//           <div className="md:w-3/4 w-full">
//             <div className="p-6  bg-white ">
//               <h3 className="text-xl font-semibold mb-4">Notifications</h3>

//               {/* Product Notifications Section */}
//               <div className="mb-6">
//                 <h4 className="font-semibold">Product notifications</h4>
//                 <p className="text-gray-600 text-sm mb-4">
//                   We’ll inform you about new job matches and applications that
//                   need your attention so you can be among the first applicants
//                   and maximize your chances of getting the dream job.
//                 </p>

//                 {/* Email Notification Toggle */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <button
//                     onClick={() => setEmailNotifications(!emailNotifications)}
//                     className={`relative w-12 h-6 rounded-full transition duration-300 ${
//                       emailNotifications ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     <span
//                       className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
//                         emailNotifications ? "translate-x-6" : ""
//                       }`}
//                     ></span>
//                   </button>
//                   <label className="text-gray-700">Email notifications</label>
//                 </div>

//                 {/* SMS Notification Toggle */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <button
//                     onClick={() => setSmsNotifications(!smsNotifications)}
//                     className={`relative w-12 h-6 rounded-full transition duration-300 ${
//                       smsNotifications ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     <span
//                       className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
//                         smsNotifications ? "translate-x-6" : ""
//                       }`}
//                     ></span>
//                   </button>
//                   <label className="text-gray-700">SMS notifications</label>
//                 </div>
//               </div>

//               {/* Marketing Notifications Section */}
//               <div>
//                 <h4 className="font-semibold">Marketing notifications</h4>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() =>
//                       setMarketingNotifications(!marketingNotifications)
//                     }
//                     className={`relative w-12 h-6 rounded-full transition duration-300 ${
//                       marketingNotifications ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     <span
//                       className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
//                         marketingNotifications ? "translate-x-6" : ""
//                       }`}
//                     ></span>
//                   </button>
//                   <label className="text-gray-700">
//                     I am open to receive marketing communications.
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";

export default function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Notification Preferences
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://api.abroadium.com/api/jobseeker/notification-permission",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const { is_email, is_sms, is_marketing_notification } =
            response.data.data;
          setEmailNotifications(is_email);
          setSmsNotifications(is_sms);
          setMarketingNotifications(is_marketing_notification);
        } else {
          setError("Failed to load notification settings.");
        }
      } catch (err) {
        console.error("Error fetching notification settings:", err);
        setError("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  // Update Notification Preferences
  const updateNotification = async (type, value) => {
    const updatedSettings = {
      is_email: type === "email" ? value : emailNotifications,
      is_sms: type === "sms" ? value : smsNotifications,
      is_marketing_notification:
        type === "marketing" ? value : marketingNotifications,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://api.abroadium.com/api/jobseeker/notification-permission",
        updatedSettings,
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.error("Error updating notification settings:", err);
      setError("Failed to update notification settings.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-10 max-w-5xl mx-auto bg-gradient-to-b from-white to-blue-100 ">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="md:w-1/4 w-full">
            <Sidebar />
          </div>
          <div className="md:w-3/4 w-full">
            <div className="p-6 bg-white shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-4">Notifications</h3>

              {/* Product Notifications */}
              <div className="mb-6">
                <h4 className="font-semibold">Product notifications</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Stay ahead in your job search with Abroadium Resume Builder!
                  Get notified about new job matches and applications requiring
                  your attention, ensuring you are among the first to apply and
                  increasing your chances of landing your dream job.
                </p>

                {/* Email Notification Toggle */}
                <ToggleSwitch
                  label="Email notifications"
                  enabled={emailNotifications}
                  onChange={() => {
                    setEmailNotifications(!emailNotifications);
                    updateNotification("email", !emailNotifications);
                  }}
                />

                {/* SMS Notification Toggle */}
                <ToggleSwitch
                  label="SMS notifications"
                  enabled={smsNotifications}
                  onChange={() => {
                    setSmsNotifications(!smsNotifications);
                    updateNotification("sms", !smsNotifications);
                  }}
                />
              </div>

              {/* Marketing Notifications */}
              <div>
                <h4 className="font-semibold">Marketing notifications</h4>
                <ToggleSwitch
                  label="I am open to receive marketing communications."
                  enabled={marketingNotifications}
                  onChange={() => {
                    setMarketingNotifications(!marketingNotifications);
                    updateNotification("marketing", !marketingNotifications);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Toggle Switch Component
const ToggleSwitch = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            enabled ? "translate-x-6" : ""
          }`}
        ></span>
      </button>
      <label className="text-gray-700">{label}</label>
    </div>
  );
};
