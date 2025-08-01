import React, { useState, useEffect } from "react";
import axios from "axios";

function Skillhistory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://api.sentryspot.co.uk/api/user/skill-assessment-history", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Ensure response.data.data is an array before setting state
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <>
      <h5 className="text-2xl font-bold mb-6 ms-5">Skill History</h5>
      <div className="container mx-auto p-4 text-center">
        <div className="overflow-x-auto">
          {users.length === 0 ? (
            <p className="text-lg text-gray-500">There is no data available.</p>
          ) : (
            <table className="min-w-full bg-dark text-black rounded-md text-center">
              <thead>
                <tr className="bg-[#002a48] text-white">
                  <th className="py-2 px-4">Date / Time</th>
                  <th className="py-2 px-4">Verification Status</th>
                  <th className="py-2 px-4">Total Questions</th>
                  <th className="py-2 px-4">Right Answers</th>
                  <th className="py-2 px-4">Wrong Answers</th>
                  <th className="py-2 px-4">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="border border-gray-700 text-center"
                  >
                    <td className="py-2 px-4">{user.date_time || "N/A"}</td>
                    <td className="py-2 px-4">
                      {user.is_verified ? "Verified" : "Not Verified"}
                    </td>
                    <td className="py-2 px-4">{user.results.total_question}</td>
                    <td className="py-2 px-4">{user.results.right_answer}</td>
                    <td className="py-2 px-4">{user.results.wrong_answer}</td>
                    <td className="py-2 px-4">{user.results.Percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Skillhistory;
