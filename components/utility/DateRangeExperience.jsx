import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const DateRangeExperience = ({ startYear, endYear, id, layout }) => {
  const { backgroundColorss } = useContext(ResumeContext);
  if (!startYear) {
    return <p id={id} className="sub-content"></p>;
  }

  const start = new Date(startYear);
  const end = new Date(endYear);
  return (
    <p className="font-light text-sm">
      {start.toLocaleString("default", { month: "short" })}{" "}
      {start.getFullYear()} -{" "}
      {end != "Invalid Date"
        ? end.toLocaleString("default", { month: "short" }) +
          " " +
          end.getFullYear()
        : "Present"}
    </p>
  );
};

export default DateRangeExperience;
