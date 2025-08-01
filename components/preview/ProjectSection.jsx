import React from "react";
import dynamic from "next/dynamic";
import DateRange from "../utility/DateRange";
import Link from "next/link";
import DateRangeExperience from "../utility/DateRangeExperience";
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);
const ProjectsSection = ({ resumeData, headerColor }) => {
  if (!resumeData?.projects || resumeData.projects.length === 0) {
    return null;
  }

  // console.log(resumeData?.projects ,"llllll");

  return (
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2
            className="text-xl font-semibold mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
              borderBottom: `1px solid ${headerColor}`,
            }}
          >
            Projects
          </h2>
          {resumeData.projects.map((item, index) => (
            <Draggable
              key={`${item.name}-${index}`}
              draggableId={`PROJECTS-${index}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`hover:scale-105 transition-transform duration-300 mb-3 pr-2 pb-2 pt-2 rounded-md ${
                    snapshot.isDragging &&
                    "outline-dashed outline-2 outline-gray-400 bg-white"
                  }`}
                >
                  <div className="flex flex-row justify-between space-y-1">
                    <p
                      className=" text-base font-normal"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item.name}
                    </p>
                    <DateRangeExperience
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`projects-start-end-date`}
                    />
                  </div>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-base font-normal"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {item.link}
                  </Link>
                  <div
                    className="text-sm font-light"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></div>

                  <Droppable
                    droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                    type="PROJECTS_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="list-disc pl-4 mt-2 font-light text-sm"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {item.keyAchievements &&
                          item.keyAchievements.map((achievement, subIndex) => (
                            <Draggable
                              key={`${item.name}-${index}-${subIndex}`}
                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                              index={subIndex}
                            >
                              {(provided, snapshot) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`
                                    hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                    ${
                                      snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                    }`}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: achievement,
                                    }}
                                    contentEditable
                                  />
                                </li>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ProjectsSection;
