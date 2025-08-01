import React, { useContext } from "react";
import DateRange from "../utility/DateRange";
import { ResumeContext } from "../context/ResumeContext";
import DateRangeExperience from "../utility/DateRangeExperience";

const EducationSection1 = ({
  educationData,
  headerColor,
  className = "",
  layout = "column", // "column" or "row"
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  if (!educationData || educationData.length === 0) return null;

  return (
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
        className="text-xl font-semibold mb-1"
        contentEditable
        suppressContentEditableWarning
      >
        Education
      </h2>
      {educationData.map((item, index) => (
        <div
          key={index}
          className={`flex mb-1 ${
            layout === "row"
              ? "flex-row items-center justify-between flex-wrap gap-2"
              : "flex-col gap-2 justify-between"
          }`}
        >
          <div>
            <p
              contentEditable
              suppressContentEditableWarning
              className="font-normal text-base"
              style={{
                color:
                  layout === "row" || headerColor == "black"
                    ? "black"
                    : "white",
              }}
            >
              {item.degree}
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              className="font-light text-sm"
              style={{
                color:
                  layout === "row" || headerColor == "black"
                    ? "black"
                    : "white",
              }}
            >
              {item.school}
            </p>
          </div>
          <div>
            <p
              className="font-normal text-base"
              contentEditable
              suppressContentEditableWarning
              style={{
                color:
                  layout === "row" || headerColor == "black"
                    ? "black"
                    : "white",
              }}
            >
              {/* {item.location} */}
              {item.location?.split(",")[0]?.trim()}
            </p>
            <DateRangeExperience
              className="font-light text-sm"
              layout={layout}
              startYear={item.startYear}
              endYear={item.endYear}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection1;
