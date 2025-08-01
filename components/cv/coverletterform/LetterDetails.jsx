// import React, { useContext } from "react";
// import { CoverLetterContext } from "../../context/CoverLetterContext";

// const LetterDetails = () => {
//   const { coverLetterData, setCoverLetterData } =
//     useContext(CoverLetterContext);

//   const handleChange = (field, value) => {
//     setCoverLetterData((prevData) => ({
//       ...prevData,
//       letterDetails: {
//         ...prevData.letterDetails,
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="p-4 md:p-8  rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-white">Letter Details</h2>
//       <div className="space-y-4">
//         {/* Date */}
//         <div>
//           <label className="block text-white font-medium mb-2">Date</label>
//           <input
//             type="date"
//             value={coverLetterData.letterDetails.date}
//             onChange={(e) => handleChange("date", e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Select a date"
//           />
//         </div>

//         {/* Job Title */}
//         <div>
//           <label className="block text-white font-medium mb-2">Job Title</label>
//           <input
//             type="text"
//             value={coverLetterData.letterDetails.jobTitle}
//             onChange={(e) => handleChange("jobTitle", e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter the job title"
//           />
//         </div>

//         {/* Reference */}
//         <div>
//           <label className="block text-white font-medium mb-2">Reference</label>
//           <input
//             type="text"
//             value={coverLetterData.letterDetails.reference}
//             onChange={(e) => handleChange("reference", e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter the reference (e.g., Ref#123)"
//           />
//         </div>

//         {/* Company Name */}
//         <div>
//           <label className="block text-white font-medium mb-2">
//             Company Name
//           </label>
//           <input
//             type="text"
//             value={coverLetterData.letterDetails.companyName}
//             onChange={(e) => handleChange("companyName", e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter the company's name"
//           />
//         </div>

//         {/* Salutation */}
//         <div>
//           <label className="block text-white font-medium mb-2">
//             Salutation
//           </label>
//           <input
//             type="text"
//             value={coverLetterData.letterDetails.salutation}
//             onChange={(e) => handleChange("salutation", e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter the salutation (e.g., Ms. Smith)"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LetterDetails;
import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CoverLetterContext } from "../../context/CoverLetterContext";

const LetterDetails = () => {
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);

  const handleDateChange = (date) => {
    // Format the selected date as "January 17, 2025"
    const formattedDate = date
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date)
      : "";

    // Update the context with the formatted date
    setCoverLetterData((prevData) => ({
      ...prevData,
      letterDetails: {
        ...prevData.letterDetails,
        date: formattedDate,
      },
    }));
  };

  return (
    <div className="p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Letter Details</h2>
      <div className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-white font-medium mb-2">Date</label>
          <DatePicker
            selected={
              coverLetterData.letterDetails.date
                ? new Date(coverLetterData.letterDetails.date)
                : null
            }
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-white font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={coverLetterData.letterDetails.jobTitle}
            onChange={(e) =>
              setCoverLetterData((prevData) => ({
                ...prevData,
                letterDetails: {
                  ...prevData.letterDetails,
                  jobTitle: e.target.value,
                },
              }))
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the job title"
          />
        </div>

        {/* Reference */}
        <div>
          <label className="block text-white font-medium mb-2">Reference (Optional) </label>
          <input
            type="text"
            value={coverLetterData.letterDetails.reference}
            onChange={(e) =>
              setCoverLetterData((prevData) => ({
                ...prevData,
                letterDetails: {
                  ...prevData.letterDetails,
                  reference: e.target.value,
                },
              }))
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the reference (e.g., Ref#123)"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-white font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={coverLetterData.letterDetails.companyName}
            onChange={(e) =>
              setCoverLetterData((prevData) => ({
                ...prevData,
                letterDetails: {
                  ...prevData.letterDetails,
                  companyName: e.target.value,
                },
              }))
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the company's name"
          />
        </div>

        {/* Salutation */}
        <div>
          <label className="block text-white font-medium mb-2">
            Salutation
          </label>
          <input
            type="text"
            value={coverLetterData.letterDetails.salutation}
            onChange={(e) =>
              setCoverLetterData((prevData) => ({
                ...prevData,
                letterDetails: {
                  ...prevData.letterDetails,
                  salutation: e.target.value,
                },
              }))
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the salutation (e.g., Ms. Smith)"
          />
        </div>
      </div>
    </div>
  );
};

export default LetterDetails;
