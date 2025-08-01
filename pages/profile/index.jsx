import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    professional_title: '',
    languages: '',
    age: '',
    current_salary: '',
    expected_salary: '',
    description: '',
    country_id: '',
    state_id: '',
    city_id: '',
    uploadPhoto: null
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        
        const token = localStorage.getItem("token");
        
        // Fetch user profile
        const userProfileResponse = await axios.get('https://api.sentryspot.co.uk/api/user/user-profile', {
          headers: {
            Authorization: token,
          },
        });
        
        if (userProfileResponse.data.status === 'success') {
          const userData = userProfileResponse.data.data;
          setFormData(prevData => ({
            ...prevData,
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            professional_title: userData.professional_title || '',
            languages: userData.languages || '',
            age: userData.age || '',
            current_salary: userData.current_salary || '',
            expected_salary: userData.expected_salary || '',
            phone: userData.phone || '',
            email: userData.email || '',
            description: userData.description || '',
            country_id: userData.country_id || '',
            state_id: userData.state_id || '',
            city_id: userData.city_id || ''
          }));

          // Fetch countries
          const countriesResponse = await axios.get('https://api.sentryspot.co.uk/api/user/countries');
          if (countriesResponse.data.status === 'success') {
            setCountries(countriesResponse.data.data);
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country_id) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`https://api.sentryspot.co.uk/api/user/stats/${formData.country_id}`, {
            headers: {
              Authorization: token, // Ensure token is included correctly
            },
          });
          if (response.data.status === 'success') {
            setStates(response.data.data);
           
          }
          else if(response.data.message === 'Records not found'){
              toast.error("state not availabe")
          }
          else {
            console.error('API Error:', response.data.message);
          }
        } catch (error) {
          console.error('Request Error:', error);
        }
      }
    };
  
    fetchStates();
  }, [formData.country_id]);
  

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state_id) {
        setLoading(true); // Set loading state to true
        try {
          const citiesResponse = await axios.get(`https://api.sentryspot.co.uk/api/user/cities/${formData.state_id}`);
          
          if (citiesResponse.data.status === 'success') {
            if (citiesResponse.data.message === "Records not found") {
              setCities([]); // Set cities to an empty array if no records are found
              setError("No cities found for the selected state.");
            } else {
              setCities(citiesResponse.data.data); // Set cities if data is found
              setError(null); // Clear any previous error
            }
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setError("An error occurred while fetching cities."); // Set error message
        } finally {
          setLoading(false); // Set loading to false when done
        }
      }
    };
  
    fetchCities();
  }, [formData.state_id]);

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      country_id: selectedCountryId,
      state_id: '',
      city_id: ''
    }));
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      state_id: selectedStateId,
      city_id: ''
    }));
    setCities([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      uploadPhoto: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('professional_title', formData.professional_title);
    formDataToSend.append('languages', formData.languages);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('current_salary', formData.current_salary);
    formDataToSend.append('expected_salary', formData.expected_salary);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('country_id', formData.country_id);
    formDataToSend.append('state_id', formData.state_id);
    formDataToSend.append('city_id', formData.city_id);

    if (formData.uploadPhoto) {
      formDataToSend.append('upload_photo', formData.uploadPhoto);
    }

    try {
      const response = await axios.patch('https://api.sentryspot.co.uk/api/user/user-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      if (response.data.status === 'success') {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred during profile update:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-2 md:p-6">
        <div className="text-center text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6">
      <div className="w-[15rem] md:w-full mx-auto rounded-lg shadow-lg px-4 py-2 md:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">BASIC INFORMATION</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block mb-2">Change Your Image:</label>
            <div className="md:flex items-center ">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 mr-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">First Name*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Last Name*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Professional Title*</label>
              <input
                type="text"
                name="professional_title"
                value={formData.professional_title}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Languages*</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Age*</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border p-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Current Salary ($):</label>
              <input
                type="number"
                name="current_salary"
                value={formData.current_salary}
                onChange={handleChange}
                className="w-full border p-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Expected Salary ($):</label>
              <input
                type="number"
                name="expected_salary"
                value={formData.expected_salary}
                onChange={handleChange}
                className="w-full border p-2"
                min="0"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2"
                rows="4"
              />
            </div>

            <div>
              <label className="block mb-2">Phone Number </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                
                className="w-full border p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2"
               readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Country:</label>
              <select
                name="country_id"
                value={formData.country_id}
                onChange={handleCountryChange}
                className="w-full border p-2"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">State:</label>
              <select
                name="state_id"
                value={formData.state_id}
                onChange={handleStateChange}
                className="w-full border p-2"
                disabled={!formData.country_id}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">City:</label>
              <select
                name="city_id"
                value={formData.city_id}
                onChange={(e) => setFormData(prevData => ({ ...prevData, city_id: e.target.value }))}
                className="w-full border p-2"
                disabled={!formData.state_id}
              >
                <option value="">Select a city</option>
               {loading ? (
      <option disabled>Loading cities...</option>
    ) : error ? (
      <option disabled>{error}</option> // Show error if available
    ) : cities.length > 0 ? (
      cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))
    ) : (
      <option disabled>No cities available</option> // Show when no cities are found
    )}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
