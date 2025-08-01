// import React, { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";

// const Language = ({ title, languages, headerColor }) => {
//   const { backgroundColorss } = useContext(ResumeContext);

//   return (
//     languages?.length > 0 && (
//       <div>
//         {/* Title */}
//         {title && (
//           <h2
//             style={{
//               color: `${
//                 headerColor == "black" ? `${backgroundColorss}` : headerColor
//               }`,
//               borderBottom: `1px solid ${
//                 headerColor == "black" ? `${backgroundColorss}` : headerColor
//               }`,
//             }}
//             contentEditable
//             suppressContentEditableWarning
//             className="text-lg font-semibold mb-1"
//           >
//             {title}
//           </h2>
//         )}
//         {/* Languages List */}
//         <ul
//           style={{ color: headerColor }}
//           className="list-disc ml-6 font-medium content"
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

// export default Language;

import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Language = ({ title, languages, headerColor }) => {
  const { backgroundColorss } = useContext(ResumeContext);

  return (
    languages?.length > 0 && (
      <div>
        {/* Title */}
        {title && (
          <h2
            style={{
              color: `${
                headerColor == "black" ? `${backgroundColorss}` : headerColor
              }`,
              borderBottom: `1px solid ${
                headerColor == "black" ? `${backgroundColorss}` : headerColor
              }`,
            }}
            contentEditable
            suppressContentEditableWarning
            className="text-xl font-semibold mb-1"
          >
            {title}
          </h2>
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

export default Language;
