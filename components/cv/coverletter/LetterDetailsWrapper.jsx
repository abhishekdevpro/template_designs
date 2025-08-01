import React from "react";
import PropTypes from "prop-types";

const LetterDetailsWrapper = ({
  letterDetails,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  return (
    <div className={`  ${className}`}>
      <div className="space-y-4">
        {/* Date */}
        {letterDetails.date && (
          <p
            style={{ color: headerColor }}
            className={`text-gray-800 ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {letterDetails.date}
          </p>
        )}
        {/* Job Title and Reference in One Line */}
        <div className="flex space-x-4">
          {/* Job Title */}
          {letterDetails.jobTitle && (
            <p
              style={{ color: headerColor }}
              className={`text-gray-800 ${
                editable
                  ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                  : ""
              }`}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              <strong>Job Title:</strong> {letterDetails.jobTitle}
            </p>
          )}

          {/* Reference */}
          {letterDetails.reference && (
            <p
              style={{ color: headerColor }}
              className={`text-gray-800 ${
                editable
                  ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                  : ""
              }`}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {letterDetails.reference}
            </p>
          )}
        </div>
        {/* Company Name */}
        {letterDetails.companyName && (
          <p
            style={{ color: headerColor }}
            className={`text-gray-800 ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Company Name:</strong> {letterDetails.companyName}
          </p>
        )}
        {/* Salutation */}
        {letterDetails.salutation && (
          <p
            style={{ color: headerColor }}
            className={`text-gray-800 ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Dear</strong> {letterDetails.salutation}
          </p>
        )}
      </div>
    </div>
  );
};

LetterDetailsWrapper.propTypes = {
  letterDetails: PropTypes.shape({
    date: PropTypes.string,
    jobTitle: PropTypes.string,
    reference: PropTypes.string,
    companyName: PropTypes.string,
    salutation: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

LetterDetailsWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default LetterDetailsWrapper;
