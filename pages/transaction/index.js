import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Index = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const orderId = localStorage.getItem("orderid");
    console.log(orderId);
    
    if (orderId) {
      const verifyOrder = async () => {
        try {
          const response = await fetch(`https://api.sentryspot.co.uk/api/user/paypal/verify-order?orderid=${orderId}`);
          if (!response.ok) {
            throw new Error("Payment Failed: Try again");
          }
          const data = await response.json();
          setVerificationResult(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      verifyOrder(); // Call the verifyOrder function
    } else {
      setLoading(false); // If no order ID is found, stop loading
      setError("No order ID found in local storage.");
    }
  }, []); // Dependency array is empty to run effect only once on mount

  const handleRedirect = () => {
    router.push('/dashboard/aibuilder'); // Redirect to /dashboard/aibuilder
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="bg-red-100 h-screen text-3xl text-center content-center font-semibold ">
      
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className>
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                {error}
                </h1>
                <p className="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                <button onClick={handleRedirect} className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me there!</button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>

      
    </div>
  );

  return (
    <>
      <h1>Order Verification</h1>
      {verificationResult ? (
        <div>
          <h2>Verification Result:</h2>
          <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
        </div>
      ) : (
        <div>No verification result available.</div>
      )}<><div className="bg-red-100 h-screen text-3xl text-center content-center font-semibold ">
      
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className>
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                {error}
                </h1>
                <p className="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                <button onClick={handleRedirect} className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me there!</button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>

      
    </div></>
      <button onClick={handleRedirect} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded">
        Go to AI Builder
      </button>
    </>
  );
};

export default Index;
