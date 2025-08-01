
import { useState } from 'react';
import axios from 'axios';
import React from 'react'
import Home_third from './Home_third';
import Link from 'next/link';

function Home_second() {

    const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Fixed price

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handlePayment = (e) => {
    e.preventDefault();
    const amount=269;
    
    const payload = {
      amount,
      ResumeId: "9CN06189KH259320999",
      Name: name,
      Email: email,
      Phone: phone,
    };

    axios.post('https://api.sentryspot.co.uk/api/user/paypal/create-payment', payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      const data = response.data;
      if (data && data.data) {
        // Redirect to the PayPal URL provided in the response
        window.location.href = data.data;
      }
    })
    .catch(error => 
        console.error('Payment Error:', error));
    
    handleCloseModal(); // Close the modal after submitting the form
  };

   
  const [showModal1, setShowModal1] = useState(false);
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  // Fixed price

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const handlePayment1 = (e) => {
    e.preventDefault();
    const amount=349;
    
    const payload = {
      amount,
      ResumeId: "9CN06189KH259320999",
      Name: name1,
      Email: email1,
      Phone: phone1,
    };

    axios.post('https://api.sentryspot.co.uk/api/user/paypal/create-payment', payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      const data = response.data;
      if (data && data.data) {
        // Redirect to the PayPal URL provided in the response
        window.location.href = data.data;
      }
    })
    .catch(error => 
        console.error('Payment Error:', error));
    
    handleCloseModal1(); // Close the modal after submitting the form
  };

    return ( <>
    
    <div className='  '>
      <section className="bg-gray-800 dark:bg-blue-200">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold bg-gray-800 rounded-2xl text-white border p-3">Choose a Plan, Which is right for you?</h2>
          </div>
          <div className="space-y-4 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* Pricing Card */}
            
            {/* Pricing Card */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-bold">Resume Builder</h3>
              <p className="font-light text-white sm:text-lg dark:text-white">Relevant for automation &amp; one time download.</p>
              <div className="flex justify-center items-baseline my-8 gap-3">
                <span className="text-white dark:text-white">Starting { " "}</span>
                <span className="mr-2 text-5xl font-extrabold">$0</span>
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Create optimized resumes</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Copy and paste content from site</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Unlimited resume edits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Save resume as pdf and docs</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Download fully formatted Resume</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                 
                </li>
              </ul>
              <Link href="/login2" className="text-white border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started for Free</Link>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-bold">Expert Human Writer</h3>
              <p className="font-light text-white sm:text-lg dark:text-white">Best for large scale uses and extended redistribution rights.</p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$269</span>
                <span className="text-white dark:text-white">/Resume</span>
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Create optimized resumes</span>
                </li>
                
                
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Receive resume in pdf and docs</span>
                </li>

                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Cover letter included</span>
                </li>

              
             
              
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>3 revisions included</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Speak one on one with writer</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Final Delivery 1 week</span>
                </li>
              </ul>
              <button
             
                className="text-white bg-primary-600 border hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={handleShowModal}
               >
                Get started</button>
            </div>

            {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white"><strong className='text-lg'>🛒 Checkout </strong><br/> Payment Details</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-white mb-2">👨🏻‍💼Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 bg-blue- rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">☎️Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">💵Amount $</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={"269"}
                  readOnly
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{showModal1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">🛒 Checkout <br/> Payment Details</h2>

            <form onSubmit={handlePayment1}>
              <div className="mb-4">
                <label className="block text-white mb-2">👨🏻‍💼Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 bg-blue- rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">☎️Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">💵Amount $</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={"349"}
                  readOnly
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={handleCloseModal1}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      


            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-bold"> French English Combo</h3>
              <p className="font-light text-white sm:text-lg dark:text-white">Best for large scale uses and extended redistribution rights.</p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$349</span>
                <span className="text-white dark:text-white">/Resume</span>
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Create optimized resumes</span>
                </li>
                
                
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Receive resume in pdf and docs</span>
                </li>

                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Cover letter included</span>
                </li>
                
               
             
              
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>3 revisions included</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Speak one on one with writer</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Final Delivery 1 week</span>
                </li>
              </ul>
              <button
             
                className="text-white bg-primary-600 border hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={handleShowModal1}
               >
                Get started</button>
            </div>


           


          </div>
        </div>
      </section>
      </div>

    <Home_third/>
    </> );
}

export default Home_second;