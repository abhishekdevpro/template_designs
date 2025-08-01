import React, { useContext, forwardRef } from "react";

import { ResumeContext } from "../../components/context/ResumeContext";
import dynamic from "next/dynamic";

import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template12 from "./Template12";
import Template13 from "./Template13";
import Template14 from "./Template14";
import Template15 from "./Template15";
import Template16 from "./Template16";
import Template17 from "./Template17";
import Template18 from "./Template18";
import Template19 from "./Template19";
import Template20 from "./Template20";
import Template21 from "./Template21";
import Template22 from "./Template22";
import Template23 from "./Template23";
import Template24 from "./Template24";
import Template25 from "./Template25";
import Template26 from "./Template26";
import Template27 from "./Template27";
import Template28 from "./Template28";
// Importing draggable components dynamically
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

const DashboardPreview = forwardRef(({ selectedTemplate }, ref) => {
  const { resumeData, setResumeData, selectedFont } = useContext(ResumeContext);
  // console.log(resumeData, ">>>previewdashboard")

  const templates = {
    template1: <Template1 />,
    template2: <Template2 />,
    template3: <Template3 />,
    template4: <Template4 />,
    template5: <Template5 />,
    template6: <Template6 />,
    template7: <Template7 />,
    template8: <Template8 />,
    template9: <Template9 />,
    template10: <Template10 />,
    template11: <Template11 />,
    template12: <Template12 />,
    template13: <Template13 />,
    template14: <Template14 />,
    template15: <Template15 />,
    template16: <Template16 />,
    template17: <Template17 />,
    template18: <Template18 />,
    template19: <Template19 />,
    template20: <Template20 />,
    template21: <Template21 />,
    template22: <Template22 />,
    template23: <Template23 />,
    template24: <Template24 />,
    template25: <Template25 />,
    template26: <Template26 />,
    template27: <Template27 />,
    template28: <Template28 />,
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  return (
    <div className="a4-wrapper-dashboard">
      <div
        ref={ref}
        className="preview-dashboard"
        style={{ fontFamily: selectedFont }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {templates[selectedTemplate]}
        </DragDropContext>
      </div>
    </div>
  );
});

DashboardPreview.displayName = "DashboardPreview";

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (preview) {
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    } else {
      console.error("Element with class 'preview' not found.");
    }
  };

  return (
    <div className="a4-wrapper-dashboard" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default DashboardPreview;
