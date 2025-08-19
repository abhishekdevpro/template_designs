// import React, { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";

// const Language2 = ({
//      title, 
//      languages, 
//      headerColor,
//      headerBackground = "" }) => {
//   const { backgroundColorss } = useContext(ResumeContext);
//   console.log(headerBackground ," This is header ");
//   return (
//     languages?.length > 0 && (
//       <div style={{ backgroundColor: headerColor }}>
//         {/* Title */}
//         {title && (
//           <h2
//             style={{
//             //   color: headerColor,
//             //   borderBottom: `1px solid ${headerColor}`,
//             //   backgroundColor : `${headerBackground}`,
//             //   borderBottom: `1px solid ${
//             //   headerColor == "black" ? `${backgroundColorss}` : headerColor
//             //   }`,
//             color: headerColor,
//               borderBottom: `1px solid ${headerColor}`,
//               backgroundColor : `${headerBackground}`,
//             }}
//             contentEditable
//             suppressContentEditableWarning
//             className="text-xl font-semibold mb-1"
//           >
//             {title}
//           </h2>
//         )}
//         {/* Languages List */}
//         <ul
//           style={{ color: headerColor }}
//           className="list-disc pl-5 font-light text-sm"
//         >
//           {languages.map((lang, index) => (
//             <li
//               key={index}
//               className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300 "
//             >
//               <span contentEditable suppressContentEditableWarning>
//                 {lang.language || "English"} ({lang.proficiency || "Native"})
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   );
// };

// export default Language2;

import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Language2 = ({ title, languages, headerColor, newlayout = "default" }) => {
  const { backgroundColorss } = useContext(ResumeContext);
  if (newlayout === "timeline") {
    return (
      languages?.length > 0 && (
        <div className={`mb-0 `}>
          <div className="flex">
            {/* Left Column - Title */}
            <div className="w-1/4">
              {title && (
                <h2
                  style={{
                    color: `${
                      headerColor == "black"
                        ? `${backgroundColorss}`
                        : headerColor
                    }`,
                  }}
                  contentEditable
                  suppressContentEditableWarning
                  className="text-xl font-semibold"
                >
                  {title}
                </h2>
              )}
            </div>

            {/* Vertical separator line */}
            <div className="w-0.5 bg-gray-300 mx-4" />

            {/* Right Column - Content */}
            <div className="w-3/4">
              <ul
                style={{ color: headerColor }}
                className="list-disc pl-5 font-light text-sm"
              >
                {languages.map((lang, index) => (
                  <li
                    key={index}
                    className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300 "
                  >
                    <span contentEditable suppressContentEditableWarning>
                      {lang.language || "English"} (
                      {lang.proficiency || "Native"})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    );
  }
  return (
    languages?.length > 0 && (
      <div>
        {/* Title */}
        {title && (
          <div
            className="text-white p-0"
            style={{
              backgroundColor: `${backgroundColorss}`,
            }}
          >
            <h2
              // style={{
              //   color: `${
              //     headerColor == "black" ? `${backgroundColorss}` : headerColor
              //   }`,
              //   borderBottom: `1px solid ${
              //     headerColor == "black" ? `${backgroundColorss}` : headerColor
              //   }`,
              // }}
              contentEditable
              suppressContentEditableWarning
              className="text-xl font-semibold mb-1"
            >
              {title}
            </h2>
          </div>
        )}
        {/* Languages List */}
        <ul
          style={{ color: headerColor }}
          className="list-disc pl-5 font-light text-sm"
        >
          {languages.map((lang, index) => (
            <li
              key={index}
              className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300 "
            >
              <span contentEditable suppressContentEditableWarning>
                {lang.language || "English"} ({lang.proficiency || "Native"})
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Language2;
