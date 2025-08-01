import React, { useState, useEffect } from "react";
import axios from "axios";

const List = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://api.sentryspot.co.uk/api/admin/referral-users", {
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
      <h5 className="text-2xl font-bold mb-6 ms-5">Referral List</h5>
      <div className="container mx-auto p-4 text-center">
        <div className="overflow-x-auto">
          {users.length === 0 ? (
            <p className="text-lg text-gray-500">There is no data available.</p>
          ) : (
            <table className="min-w-full bg-dark text-black rounded-md text-center">
              <thead>
                <tr className="bg-[#002a48] text-white">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone</th>

                  <th className="py-2 px-4">Remark</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="border border-gray-700 text-center"
                  >
                    <td className="py-2 px-4">{user.name || "N/A"}</td>
                    <td className="py-2 px-4">{user.email || "N/A"}</td>
                    <td className="py-2 px-4">{user.phone || "N/A"}</td>

                    <td className="py-2 px-4">{user.remark || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
