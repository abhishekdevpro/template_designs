import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscriberslist1() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://api.sentryspot.co.uk/api/admin/subscribes', {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        // Ensure response.data.data is an array before setting state
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Failed to load users.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnsubscribe = async (email) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'https://api.sentryspot.co.uk/api/user/user-subscribe',
        { email },  // Sending email in the body
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update the user subscription status after unsubscribing
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === email ? { ...user, is_subscribe: 0 } : user
        )
      );
    } catch (error) {
      console.error('Error unsubscribing user:', error);
      alert('Failed to unsubscribe user.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <p className="text-lg text-gray-500">There is no data available.</p>
        ) : (
          <table className="min-w-full bg-dark text-black rounded-md text-center">
            <thead>
              <tr className='bg-violet-300'>
                <th className="py-2 px-4">Created At</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Subscription Status</th>
                <th className="py-2 px-4">Subscription Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t border-gray-700 text-center">
                  <td className="py-2 px-4">{user.created_at || "N/A"}</td>
                  <td className="py-2 px-4">{user.email || "N/A"}</td>
                  <td className="py-2 px-4">
                    <button
                      className={`border px-8 rounded-3xl py-2 ${
                        user.is_subscribe === 1 ? 'bg-green-700' : 'bg-red-700'
                      } text-white`}
                    >
                      {user.is_subscribe === 1 ? '🔔 Subscribed' : '🔕 Not Subscribed'}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {user.is_subscribe === 1 && (
                      <button
                        onClick={() => handleUnsubscribe(user.email)}
                        className="bg-red-500 text-white px-4 py-2 rounded-3xl"
                      >
                        🔕Unsubscribe
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Subscriberslist1;
