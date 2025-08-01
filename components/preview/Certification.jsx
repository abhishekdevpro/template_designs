// import React, { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import { Droppable, Draggable } from "react-beautiful-dnd";

// const Certification = ({
//   title = "Certifications",
//   certifications,
//   hasBullet = true,
//   headerColor,
//   className = "",
//   itemClassNames = {},
// }) => {
//   const { backgroundColorss } = useContext(ResumeContext);

//   if (!Array.isArray(certifications) || certifications.length === 0) {
//     return null;
//   }

//   return (
//     <Droppable droppableId="certifications" type="CERTIFICATIONS">
//       {(provided) => (
//         <div
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//           className={className}
//         >
//           <h2
//             style={{
//               color: `${
//                 headerColor === "black" ? `${backgroundColorss}` : headerColor
//               }`,
//               borderBottom: `1px solid ${
//                 headerColor === "black" ? `${backgroundColorss}` : headerColor
//               }`,
//             }}
//             className={`text-lg font-semibold mb-2 ${
//               itemClassNames.title || ""
//             }`}
//             contentEditable
//             suppressContentEditableWarning
//           >
//             {title}
//           </h2>
//           <ul
//             style={{ color: headerColor }}
//             className={`pl-2 p-1 font-medium ${
//               hasBullet ? "list-disc pl-6 p-2" : ""
//             }`}
//           >
//             {certifications.map((certification, index) => (
//               <Draggable
//                 key={`certification-${index}`}
//                 draggableId={`CERTIFICATION-${index}`}
//                 index={index}
//               >
//                 {(provided, snapshot) => (
//                   <li
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     className={`hover:scale-105 transition-transform duration-300
//                       ${itemClassNames.content || ""}
//                       ${
//                         snapshot.isDragging &&
//                         "outline-dashed outline-2 outline-gray-400 bg-white"
//                       }
//                       hover:outline-dashed hover:outline-2 hover:outline-gray-400`}
//                   >
//                     <div
//                       contentEditable
//                       suppressContentEditableWarning
//                       dangerouslySetInnerHTML={{ __html: certification }}
//                     />
//                   </li>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </ul>
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default Certification;

import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Certification = ({
  title = "Certifications",
  certifications,
  hasBullet = true,
  headerColor,
  className = "",
  itemClassNames = {},
}) => {
  const { backgroundColorss } = useContext(ResumeContext);

  if (!Array.isArray(certifications) || certifications.length === 0) {
    return null;
  }

  return (
    <Droppable droppableId="certifications" type="CERTIFICATIONS">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={className}
        >
          <h2
            style={{
              color: `${
                headerColor === "black" ? `${backgroundColorss}` : headerColor
              }`,
              borderBottom: `1px solid ${
                headerColor === "black" ? `${backgroundColorss}` : headerColor
              }`,
            }}
            className={`text-xl font-semibold mb-2 ${
              itemClassNames.title || ""
            }`}
            contentEditable
            suppressContentEditableWarning
          >
            {title}
          </h2>
          <ul
            style={{ color: headerColor }}
            className={` font-light text-sm ${
              hasBullet ? "list-disc pl-4 p-1" : ""
            }`}
          >
            {certifications.map((certification, index) => (
              <Draggable
                key={`certification-${index}`}
                draggableId={`CERTIFICATION-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`hover:scale-105 transition-transform duration-300 
                      ${itemClassNames.content || ""}
                      ${
                        snapshot.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                      }
                      hover:outline-dashed hover:outline-2 hover:outline-gray-400`}
                  >
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      dangerouslySetInnerHTML={{ __html: certification }}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};

export default Certification;
