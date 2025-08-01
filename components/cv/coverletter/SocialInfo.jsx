import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const SocialInfo = ({
  personalDetails,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  const { backgroundColorss } = useContext(CoverLetterContext);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="space-y-2">
        {personalDetails.email && (
          <p
            style={{ color: headerColor }}
            className={`flex items-center justify-start gap-4 break-words ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <span className="flex items-center">
              <FaEnvelope />
            </span>

            <span className="break-all">{personalDetails.email}</span>
          </p>
        )}
        {personalDetails.address && (
          <p
            style={{ color: headerColor }}
            className={`flex items-center justify-start gap-4 break-words ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <span>
              {" "}
              <FaMapMarkerAlt />
            </span>
            <span> {personalDetails.address}</span>
          </p>
        )}
        {personalDetails.contact && (
          <p
            style={{ color: headerColor }}
            className={`flex items-center justify-start gap-4 break-words ${
              editable
                ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <span>
              {" "}
              <FaPhone />{" "}
            </span>
            <span> {personalDetails.contact}</span>
          </p>
        )}
      </div>
    </div>
  );
};

SocialInfo.propTypes = {
  personalDetails: PropTypes.shape({
    email: PropTypes.string,
    address: PropTypes.string,
    contact: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

SocialInfo.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default SocialInfo;
