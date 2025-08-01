import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { ResumeContext } from "../context/ResumeContext";

const ImageWrapper = ({
  src,
  alt,
  defaultSize = 100,
  size,
  border = "2px",
  borderColor = "black",
}) => {
  const finalSize = size || defaultSize; // Use dynamic size if provided, otherwise use default size

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        border: `${border} solid ${borderColor}`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={finalSize}
          height={finalSize}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  defaultSize: PropTypes.number,
  size: PropTypes.number,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};

ImageWrapper.defaultProps = {
  alt: "profile image",
  defaultSize: 100,
  border: "2px",
  borderColor: "black",
};

const TextWrapper = ({
  name,
  position,
  headerColor = "black",
  orientation = "column",
  className = "",
  nameclassName = "",
  positionclassName = "",
}) => {
  return (
    <div
      className={`flex ${
        orientation === "row" ? "flex-row " : "flex-col "
      }  ${className}`}
    >
      <h1
        contentEditable
        suppressContentEditableWarning
        className={`text-5xl font-extrabold  ${nameclassName}`}
        style={{ color: headerColor }}
      >
        {name}
      </h1>
      <p
        contentEditable
        suppressContentEditableWarning
        className={`text-3xl font-bold text-gray-700 ${positionclassName}`}
      >
        {position}
      </p>
    </div>
  );
};

TextWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  headerColor: PropTypes.string,
  orientation: PropTypes.oneOf(["row", "column"]),
  className: PropTypes.string,
};

TextWrapper.defaultProps = {
  position: "",
  headerColor: "black",
  orientation: "column",
  className: "",
};

const SummaryWrapper = ({
  summary,
  headerColor = "black",
  editable = true,
  className = "",
  summaryclassName = "",
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  return (
    summary &&
    summary.length > 0 && (
      <div className={`mb-1 ${className}`}>
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
          className="text-xl font-semibold mb-1 "
        >
          Summary
        </h2>

        <div
          style={{ color: headerColor }}
          className={` hover:outline-dashed hover:scale-105 hover:outline-2 hover:outline-gray-400 font-light mt-2 text-sm  `}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      </div>
    )
  );
};

SummaryWrapper.propTypes = {
  summary: PropTypes.string,
  headerColor: PropTypes.string,
  editable: PropTypes.bool,
  className: PropTypes.string,
};

SummaryWrapper.defaultProps = {
  summary: "",
  headerColor: "black",
  editable: true,
  className: "",
};

export { ImageWrapper, TextWrapper, SummaryWrapper };
