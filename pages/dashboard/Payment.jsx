import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Button from "../../components/buttonUIComponent";

function Payment() {
  const handleChoosePlan3 = () => {
    const amount = 269; // Fixed price
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const payload = {
      amount,
      ResumeId: "9CN06189KH259320999", // Ensure the field name matches the API expectation
      Token: token || "", // Ensure the field name matches the API expectation
    };

    axios
      .post(
        "https://api.sentryspot.co.uk/api/user/paypal/create-payment",
        payload,
        {
          headers: { "Content-Type": "application/json" }, // Use JSON content type
        }
      )
      .then((response) => {
        const data = response.data;
        if (data && data.data) {
          // Redirect to the PayPal URL provided in the response
          window.location.href = data.data;
        }
      })
      .catch((error) => console.error("Payment Error:", error));
  };

  const handleChoosePlan4 = () => {
    const amount = 349; // Fixed price
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      window.location.href = "/login2";
      return;
    }

    const payload = {
      amount,
      ResumeId: "9CN06189KH259320999", // Ensure the field name matches the API expectation
      Token: token || "", // Ensure the field name matches the API expectation
    };

    axios
      .post(
        "https://api.sentryspot.co.uk/api/user/paypal/create-payment",
        payload,
        {
          headers: { "Content-Type": "application/json" }, // Use JSON content type
        }
      )
      .then((response) => {
        const data = response.data;
        if (data && data.data) {
          // Redirect to the PayPal URL provided in the response
          window.location.href = data.data;
        }
      })
      .catch((error) => console.error("Payment Error:", error));
  };

  return (
    <div className="min-h-screen mien bg-gray-300 flex w-full p-2">
      <div className="bg-white shadow-md rounded-lg  w-full">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="text-center mt-4">
                  <p className="text-lg font-bold text-violet-900 m">Free</p>
                  <Button className="bg-red-200 text-blue-900 p-2 px-6 rounded-lg m-4  disabled:">
                    Your Plan
                  </Button>
                </div>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                <div className="text-center">
                  <p className="text-lg font-bold ">AI resume writer</p>
                  <span className=" text-violet-900 font-bold text-lg">
                    {" "}
                    $49
                  </span>{" "}
                  <span className=" text-violet-900 ">/One Time Purchase</span>
                  <br />
                  <Link href="/dashboard/ai-resume-builder">
                    <Button className="bg-blue-900 text-white p-2 rounded-lg m-2 mt-3">
                      Choose This Plan
                    </Button>
                  </Link>
                </div>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                <div className="text-center">
                  <p className="text-lg font-bold">Expert human writer</p>
                  <span className=" text-violet-900 font-bold text-lg">
                    {" "}
                    $269
                  </span>{" "}
                  <span className=" text-violet-900 ">/Resume </span>
                  <br />
                  <Button
                    className="bg-green-700 text-white p-2 px-5 rounded-lg m-4 disabled:"
                    onClick={handleChoosePlan3}
                  >
                    Choose this plan
                  </Button>
                </div>
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                <div className="text-center">
                  <p className="text-lg font-bold">French English Combo</p>
                  <span className=" text-violet-900 font-bold text-lg">
                    {" "}
                    $369
                  </span>{" "}
                  <span className=" text-violet-900 ">/Resume </span>
                  <br />
                  <Button
                    className="bg-yellow-500 text-white p-2 px-5 rounded-lg m-4 disabled:"
                    onClick={handleChoosePlan4}
                  >
                    Choose this plan
                  </Button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600"> ✔️ Create optimized resumes</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600"> ✔️ Create optimized resumes</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600"> ✔️ Create optimized resumes</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600"> ✔️ Create optimized resumes</p>
              </td>
            </tr>

            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">
                  ✔️ Copy and paste content from site
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">
                  ✔️ Copy and paste content from site
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">
                  ✔️ Receive resume in pdf and docs
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">
                  ✔️ Receive resume in pdf and docs
                </p>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Unlimited resumes edits</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Unlimited resumes edits</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Cover letter included</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Cover letter included</p>
              </td>
            </tr>

            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✖️ </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Save resume as pdf and docs</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ 3 revisions included</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ 3 revisions included</p>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✖️ </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">
                  ✔️ Download fully formatted Resume
                </p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Speak one on one with writer</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Speak one on one with writer</p>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✖️ </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✖️ </p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️ Final Delivery 1 week</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-600">✔️Final Delivery 1 week</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payment;
