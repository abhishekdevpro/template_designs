import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
const IntroductionBodyWrapper = ({
  introduction,
  body,
  closing,
  gratitude,
  signature,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  return (
    <div className={`p-4  ${className}`}>
      {/* Introduction Section */}
      {/* {introduction && (
        <div className="mb-6">
          <p
            className={`text-gray-800 ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {introduction}
          </p>
        </div>
      )} */}

      {/* Body Section */}

      <div className="">
        {body.map((paragraph, index) => (
          <div key={index} className="mb-4">
            <h4
              className="text-lg font-medium"
              style={{ color: headerColor }}
            ></h4>
            <p
              className={`text-gray-800 ${
                editable
                  ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                  : ""
              }`}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {parse(paragraph)}
            </p>
          </div>
        ))}
        {/* {closing && (
          <div className="mb-6">
            <p
              className={`text-gray-800 ${
                editable
                  ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                  : ""
              }`}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {closing}
            </p>
          </div>
        )} */}

        {/* Gratitude Section */}
        {gratitude && (
          <p
            className={`text-gray-800 font-bold mt-4 `}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {gratitude}
          </p>
        )}

        {/* Signature Section */}
        {signature && (
          <p
            className={`text-gray-800 font-bold  `}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {signature}
          </p>
        )}
      </div>
    </div>
  );
};

IntroductionBodyWrapper.propTypes = {
  // introduction: PropTypes.string.isRequired,
  body: PropTypes.arrayOf(PropTypes.string).isRequired,
  // closing: PropTypes.string.isRequired,
  gratitude: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

IntroductionBodyWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default IntroductionBodyWrapper;
