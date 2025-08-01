import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Payment() {
  const [users, setUsers] = useState([]);
  const [remarks, setRemarks] = useState({}); // State to store remarks

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://api.sentryspot.co.uk/api/admin/payment-history', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleRemarkChange = (Id, value) => {
    setRemarks(prevRemarks => ({
      ...prevRemarks,
      [Id]: value
    }));
  };

  const handleRemarkSubmit = (Id) => {
    const token = localStorage.getItem('token');
    const remark = remarks[Id];

    axios.post('https://api.sentryspot.co.uk/api/admin/payment-history-remark', {
      Id,
      remark
    }, {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        console.log('Remark submitted successfully:', response.data);
        toast.success(response.data.message)
        // Optionally update UI or provide feedback to the user
      })
      .catch(error => console.error('Error submitting remark:', error));
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark text-black rounded-md text-center">
          <thead>
            <tr className='bg-violet-300'>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Received Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Remark</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-gray-700 text-center">
                <td className="py-2 px-4">{user.id || "N/A"}</td>
                <td className="py-2 px-4">{user.name || "N/A"}</td>
                <td className="py-2 px-4">{user.email || "N/A"}</td>
                <td className="py-2 px-4">{user.phone || "N/A"}</td>
                <td className="py-2 px-4">{user.amount || "N/A"}</td>
                <td className="py-2 px-4">{user.status || "N/A"}</td>
                <td className="py-2 px-4">
                  <input 
                    type='text' 
                    className='border-2' 
                    value={remarks[user.id] || user.remark} 
                    onChange={(e) => handleRemarkChange(user.id, e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <button 
                    onClick={() => handleRemarkSubmit(user.id)} 
                    className="bg-violet-500 text-white px-2 py-1 rounded"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payment;
