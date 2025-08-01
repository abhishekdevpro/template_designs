import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyResume1 = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const recordsPerPage = 20; // Records to display per page

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch all user data
    axios.get('https://api.sentryspot.co.uk/api/admin/users', {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      const data = response.data.data;

      // Set users and calculate total pages based on records
      setUsers(data);
      setTotalPages(Math.ceil(data.length / recordsPerPage));
    })
    .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // Calculate the current records to display based on current page
  const indexOfLastUser = currentPage * recordsPerPage; // Last index of current page
  const indexOfFirstUser = indexOfLastUser - recordsPerPage; // First index of current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Sliced array of users for current page

  // Go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark text-black rounded-md text-center">
          <thead>
            <tr className='bg-violet-300'>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Mobile</th>
              <th className="py-2 px-4">Created At</th>
              <th className="py-2 px-4">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="border-t border-gray-700 text-center">
                <td className="py-2 px-4">{user.first_name || "N/A"}</td>
                <td className="py-2 px-4">{user.last_name || "N/A"}</td>
                <td className="py-2 px-4">{user.email || "N/A"}</td>
                <td className="py-2 px-4">{user.mobile || "N/A"}</td>
                <td className="py-2 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4">{new Date(user.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-gray-300 rounded-md mx-2"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-gray-300 rounded-md mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyResume1;
