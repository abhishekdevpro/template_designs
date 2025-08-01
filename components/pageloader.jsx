// // components/PageLoader.jsx
// import { useEffect, useState } from "react";

// const PageLoader = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay (e.g., API or static content load)
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000); // 1 second delay

//     return () => clearTimeout(timer);
//   }, []);

//   if (!loading) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       {/* Replace with your animation or spinner */}
//       <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default PageLoader;
// components/PageLoader.jsx
import { useEffect, useState } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 ">
      <div className="page-loader "></div>
    </div>
  );
};

export default PageLoader;
