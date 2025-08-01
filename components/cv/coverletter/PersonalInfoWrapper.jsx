import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CoverLetterContext } from "../../context/CoverLetterContext";

const PersonalInfoWrapper = ({
  personalDetails,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  const { backgroundColorss } = useContext(CoverLetterContext);

  return (
    <div className={` ${className}`}>
      <div className="space-y-2">
        {personalDetails.name && (
          <div>
            <h2
              style={{
                color: `${
                  headerColor === "black" ? backgroundColorss : headerColor
                }`,
                // borderBottom: `2px solid ${
                //   headerColor === "black" ? backgroundColorss : headerColor
                // }`,
              }}
              className="text-4xl font-extrabold mb-2 "
            >
              {personalDetails.name}
            </h2>
          </div>
        )}
        {personalDetails.position && (
          <div>
            <p
              style={{
                color: `${
                  headerColor === "black" ? backgroundColorss : headerColor
                }`,
                // borderBottom: `2px solid ${
                //   headerColor === "black" ? backgroundColorss : headerColor
                // }`,
              }}
              className="text-2xl font-bold mb-2 "
            >
              {personalDetails.position}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

PersonalInfoWrapper.propTypes = {
  personalDetails: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    contact: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

PersonalInfoWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default PersonalInfoWrapper;
