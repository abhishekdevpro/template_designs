// import "/styles/globals.css"; // Global CSS
// import "slick-carousel/slick/slick.css"; // Slick carousel styles
// import "slick-carousel/slick/slick-theme.css";
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles
// import Head from "next/head";
// import { ToastContainer } from "react-toastify"; // Import Toastify container
// import { ResumeProvider } from "../components/context/ResumeContext";
// import { CoverLetterProvider } from "../components/context/CoverLetterContext";
// import { useRouter } from "next/router"; // Import useRouter
// import Meta from "../components/meta/Meta";
// import PageLoader from "../components/pageloader";

// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   // Static excluded routes
//   const excludedRoutes = [
//     "/dashboard/resume-builder",
//     "/dashboard/cv-builder",
//     "/dashboard/aibuilder",
//     "/dashboard/cvaibuilder",
//   ];

//   // Dynamic excluded patterns
//   const dynamicExcludedPatterns = [
//     /^\/dashboard\/resume-builder\/.*$/, // Matches any path after resume-builder/
//     /^\/dashboard\/cv-builder\/.*$/, // Matches any path after cv-builder/
//     /^\/dashboard\/aibuilder\/.*$/, // Matches any path after aibuilder/
//     /^\/dashboard\/cvaibuilder\/.*$/, // Matches any path after cvaibuilder/
//   ];

//   // Check if the current route is excluded
//   const isExcluded =
//     excludedRoutes.includes(router.pathname) ||
//     dynamicExcludedPatterns.some((pattern) => pattern.test(router.asPath));
//   if (process.env.NODE_ENV === "production") {
//     console.log = () => {};
//     console.error = () => {};
//     console.warn = () => {};
//   }
//   return (
//     <>
//       {!isExcluded && (
//         <Head>
//           {/* <script
//             dangerouslySetInnerHTML={{
//               __html: `
//                 window.chtlConfig = { chatbotId: "1256619196" };
//               `,
//             }}
//           />
//           <script
//             async
//             data-id="1256619196"
//             id="chatling-embed-script"
//             type="text/javascript"
//             src="https://chatling.ai/js/embed.js"
//           /> */}
//         </Head>
//       )}
//       <Meta
//         title="Abroadium - AI Resume Builder"
//         description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//         keywords="ATS-friendly, Resume optimization..."
//       />
//       <ResumeProvider>
//         <CoverLetterProvider>
//           <PageLoader />
//           <Component {...pageProps} />
//           <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
//         </CoverLetterProvider>
//       </ResumeProvider>
//     </>
//   );
// }
// import "/styles/globals.css";
// // In your component or _app.js
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { ResumeProvider } from "../components/context/ResumeContext";
// import { CoverLetterProvider } from "../components/context/CoverLetterContext";

// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const adminToken = localStorage.getItem("token"); // Separate token for admin
//     const isDashboardRoute = router.pathname.startsWith("/dashboard");
//     const isAdminRoute = router.pathname.startsWith("/admin"); // Check for admin routes

//     if (isDashboardRoute && !token) {
//       router.push("/login");
//     }

//     if (isAdminRoute && !token) {
//       router.push("/adminlogin");
//     }
//   }, [router.pathname]);

//   return (
//     <>
//       <CoverLetterProvider>
//         <ResumeProvider>
//           <Component {...pageProps} />
//           <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
//         </ResumeProvider>
//       </CoverLetterProvider>
//     </>
//   );
// }
import "/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ResumeProvider } from "../components/context/ResumeContext";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";
import axios from "axios";
import Meta from "../components/meta/Meta";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isDashboardRoute = router.pathname.startsWith("/dashboard");
    const isAdminRoute = router.pathname.startsWith("/admin");

    // Redirect if no token is found
    if (isDashboardRoute && !token) {
      router.push("/login");
    }

    if (isAdminRoute && !token) {
      router.push("/adminlogin");
    }

    // Set up Axios interceptor to catch 401 responses
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token"); // Clear token
          router.push("/login"); // Redirect to login
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [router.pathname]);

  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }
  return (
    <>
      <Meta
        title="Best AI Resume Builder Online | ResumeIntellect"
        description="Create a professional resume easily with our best AI resume builders online. Make customized, job-friendly resumes and download in minutes and get hired faster"
        keywords=" AI Resume Builder, Free AI Resume Builder, Resume Maker, Online Resume Builder, AI CV Generator, Professional Resume Creator, Resume Generator, AI Resume Creator"
      />
      <CoverLetterProvider>
        <ResumeProvider>
          <Component {...pageProps} />
          {/* <CookieConsent /> */}

          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </ResumeProvider>
      </CoverLetterProvider>
    </>
  );
}
