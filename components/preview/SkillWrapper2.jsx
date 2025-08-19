import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Skills from "./Skills";
import { ResumeContext } from "../context/ResumeContext";

const SkillsWrapper2 = ({
  skills,
  headerColor = "",
  droppableId = "skills",
  className = "",
  textColor = "white",
  bgHeader = "",
  layout,
  headerBackground = ""
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  return (
    <div className={`skills-section `}>
      <div className="" style={{ backgroundColor: headerColor }}>
          <h2
            className="font-semibold px-2 py-1"
            contentEditable
            suppressContentEditableWarning
            // style={{
            // //   backgroundColor: bgHeader || (headerColor === "black" ? backgroundColorss : headerColor),
            // backgroundColor : `${headerBackground}`,
            //   color: "#fff", // Always white for visibility
            //   borderBottom: "none"
            // }}
             style={{
              color: headerColor,
              borderBottom: `1px solid ${headerColor}`,
              backgroundColor : `${headerBackground}`,
            }}
          >
           Skills
          </h2>
          </div>

      <Droppable droppableId={droppableId} type="SKILLS">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${className}`}
          >
            {Array.isArray(skills) ? (
              skills.map((skill, index) => (
                <Draggable
                  key={`${droppableId}-${index}`}
                  draggableId={`${droppableId}-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`hover:scale-105 transition-transform duration-300 mb-1  ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white text-base"
                          : ""
                      }`}
                    >
                      <Skills
                        title={skill.title}
                        skills={skill.skills}
                        color={(headerColor = "white")}
                        layout={layout}
                        textColor={textColor}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p>No skills available</p> // Fallback content if skills are undefined or not an array
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

SkillsWrapper2.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  headerColor: PropTypes.string,
  droppableId: PropTypes.string,
  className: PropTypes.string,
};

SkillsWrapper2.defaultProps = {
  skills: [],
  headerColor: "black",
  droppableId: "skills",
  className: "",
};

export { SkillsWrapper2 };