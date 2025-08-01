import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DateRangeExperience from "../utility/DateRangeExperience";

const WorkExperience = ({
  resumeData,
  headerColor,
  className = "",
  style = {},
  itemClassNames = {},
}) => {
  if (
    resumeData.is_fresher ||
    !resumeData?.workExperience ||
    resumeData.workExperience.length === 0
  ) {
    return null;
  }

  return (
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={className}
          style={style}
        >
          <h2
            className={`${itemClassNames.title || "font-semibold"}`}
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
              borderBottom: `1px solid ${headerColor}`,
            }}
          >
            Work Experience
          </h2>

          {resumeData.workExperience.map((item, index) => (
            <Draggable
              key={`${item.company}-${index}`}
              draggableId={`WORK_EXPERIENCE-${index}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`hover:scale-105 transition-transform duration-300 mb-3 pr-2 pt-2 pb-2 rounded-md ${
                    itemClassNames.content || ""
                  } ${
                    snapshot.isDragging
                      ? "outline-dashed outline-2 outline-gray-400 bg-white"
                      : ""
                  }`}
                >
                  <div className="flex flex-row justify-between space-y-1">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      className="font-medium text-lg"
                    >
                      {item.company}
                    </p>

                    <p
                      className="font-medium text-lg"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item.location?.split(",")[0]?.trim()}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between space-y-1">
                    <p
                      className="font-normal text-base "
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item.position}
                    </p>
                    <DateRangeExperience
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`work-experience-start-end-date-${index}`}
                    />
                  </div>

                  <div
                    className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 font-light text-sm"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {Array.isArray(item?.keyAchievements) &&
                    item.keyAchievements.length > 0 && (
                      <Droppable
                        droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                        type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                      >
                        {(provided) => (
                          <ul
                            className="list-disc pl-4 mt-2 font-light text-sm"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {item.keyAchievements.map(
                              (achievement, subIndex) => (
                                <Draggable
                                  key={`ACHIEVEMENT-${index}-${subIndex}`}
                                  draggableId={`ACHIEVEMENT-${index}-${subIndex}`}
                                  index={subIndex}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
                                        snapshot.isDragging
                                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                          : ""
                                      }`}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: achievement,
                                        }}
                                        contentEditable
                                        suppressContentEditableWarning
                                      />
                                    </li>
                                  )}
                                </Draggable>
                              )
                            )}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    )}
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

export default WorkExperience;
