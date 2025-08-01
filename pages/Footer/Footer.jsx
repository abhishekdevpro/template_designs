import React from 'react';
import Image from 'next/image';
import logo from '../Footer/logo.jpg';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link'; // Import Link from next/link
import SupportPopup from './SupportPopUp';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior

        // Sending raw JSON data in the POST request
        axios.post('https://api.sentryspot.co.uk/api/user/user-subscribe', 
          JSON.stringify({ email }), // Sending email in raw JSON
          {
            headers: {
              'Content-Type': 'application/json', // Specify raw JSON
            },
          }
        )
          .then(response => {
            // Handle the response, show a success message
            setMessage('Subscribed successfully!');
            toast.success('Subscribed successfully!');
          })
          .catch(error => {
            // Handle the error, show an error message
            setMessage('Subscription failed. Please try again.');
            console.error('Error subscribing:', error);
          });
    };

    return (
      <>
        {/* <ToastContainer /> */}
        <footer className="bg-black text-white py-8" id="footerbg">
          <div className="container mx-auto flex flex-col gap-7 justify-between px-6">
            <div className="flex flex-wrap justify-between px-2 md:px-[65px]">
              <div className="md:w-auto mb-6 md:mb-0">
                <Image src={logo} className="h-14 w-full" />
                <p className="text-lg text-bold px-5">
                  Building Careers of Tomorrow
                </p>
              </div>
              <div className="w-full md:w-auto mb-6 md:mb-0">
                <h2 className="text-lg font-semibold text-white">
                  Get Our Weekly
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col md:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Type your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update the email state
                    required
                    className="p-2 rounded text-black"
                  />
                  <button
                    type="submit"
                    className="md:px-4 md:py-1 p-1 rounded-full bg-white text-black hover:bg-orange-500"
                  >
                    Subscribe
                  </button>
                </form>
                {message && <p>{message}</p>} {/* Display message */}
              </div>
            </div>
            <br />
            <div className="flex flex-wrap justify-around">
              <div className="w-full md:w-auto mb-6 md:mb-0" id="footer">
                <h2 className="text-lg font-bold text-white">Abroadium</h2>
                <ul>
                  <li>
                    <Link href="/footerr/Aboutus">
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/Careers">
                      <span>Careers</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/Placement">
                      <span>Placement Support</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://blog.abroadium.com/">
                      <span>Resources</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-auto mb-6 md:mb-0">
                <h2 className="text-lg font-bold text-white">Support</h2>
                <ul>
                  <li onClick={() => setShowPopup(true)}
                  className=" cursor-pointer">
                      <span>Support</span>
                  </li>
                  <li>
                    <Link href="/footerr/Salarytools">
                      <span>Salary Tool</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/TermsandConditions">
                      <span>Terms & Conditions</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/PrivacyPolicy">
                      <span>Privacy Policy</span>
                    </Link>
                  </li>
                </ul>
                <SupportPopup
                  isOpen={showPopup}
                  onClose={() => setShowPopup(false)}
                />
              </div>
              <div className="w-full md:w-auto mb-6 md:mb-0">
                <h2 className="text-lg font-bold text-white">
                  Scope & Products
                </h2>
                <ul>
                  <li>
                    <Link href="/footerr/AiResumeBuilder">
                      <span>Ai Resume Builder</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/AiSkillTests">
                      <span>Ai Skill Tests</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/AiCVParsing">
                      <span>Ai CV Parsing</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <span>White Labelling</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <span>Generative AI</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-auto mb-6 md:mb-0">
                <h2 className="text-lg font-bold text-white">Ai Resources</h2>
                <ul>
                  <li>
                    <Link href="/footerr/AIEnhancedResumeAccuracy">
                      <span>Ai - Resume Accuracy</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/AiResumeEnhancer">
                      <span>Ai - Resume Enhancer</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/footerr/AiJobMatchApply">
                      <span>Ai - Job Match & Apply</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container text-base md:mx-auto text-center border-t border-white pt-6 mt-6">
            <p className="text-white text-right">
              &copy; Copyright By Abroadium.ca All Rights Reserved
            </p>
          </div>
        </footer>
      </>
    );
};

export default Footer;
