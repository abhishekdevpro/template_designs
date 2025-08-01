import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const DateRange = ({ startYear, endYear, id, layout }) => {
  const { backgroundColorss } = useContext(ResumeContext);
  if (!startYear) {
    return <p id={id} className="sub-content"></p>;
  }

  const start = new Date(startYear);
  const end = new Date(endYear);
  return (
    <p
      style={{ color: layout == "row" ? "black" : "white" }}
      className="font-light text-sm"
    >
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

export default DateRange;
