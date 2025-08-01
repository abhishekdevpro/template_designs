import React, { useState } from "react";
import Preview from "./Preview";
import TemplateSelector from "./TemplateSelector";

const TemplateManager = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  return (
    <div>
      {/* Pass selectedTemplate and setSelectedTemplate to TemplateSelector */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* Pass selectedTemplate to Preview component */}
      <Preview selectedTemplate={selectedTemplate} />
    </div>
  );
};

export default TemplateManager;
