import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaSpellCheck,
  FaUndo,
  FaRedo,
  FaEraser,
  FaPalette,
} from "react-icons/fa";

import { SketchPicker } from "react-color";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "../../components/context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";

const A4_HEIGHT_PX = 1123; // Approx height for A4 at 96 DPI

const checkGrammar = () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        language: "en-US",
        text: selectedText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.matches.length > 0) {
          alert("Grammar issues found: " + data.matches.length);
        } else {
          alert("No grammar issues found!");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Please select some text to check for grammar.");
  }
};

const MenuButton = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 text-sm hover:bg-gray-200 rounded transition"
  >
    {icon}
  </button>
);

const Highlightmenubar = () => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showBgColor, setShowBgColor] = useState(false);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const toggleBold = () => formatText("bold");
  const toggleItalic = () => formatText("italic");
  const toggleUnderline = () => formatText("underline");
  const changeFontSize = (size) => formatText("fontSize", size);
  const alignText = (alignment) => formatText(`justify${alignment}`);
  const toggleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const applyColor = (command, color) => {
    formatText(command, color.hex);
    setShowTextColor(false);
    setShowBgColor(false);
  };

  return (
    <div className="relative">
      <HighlightMenu
        target="body"
        menu={() => (
          <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 relative">
            {/* Text styles */}
            <MenuButton title="Bold" icon={<FaBold />} onClick={toggleBold} />
            <MenuButton
              title="Italic"
              icon={<FaItalic />}
              onClick={toggleItalic}
            />
            <MenuButton
              title="Underline"
              icon={<FaUnderline />}
              onClick={toggleUnderline}
            />

            {/* Font size */}
            <MenuButton
              title="Increase Font Size"
              icon={<FaPlus />}
              onClick={() => changeFontSize(4)}
            />
            <MenuButton
              title="Decrease Font Size"
              icon={<FaMinus />}
              onClick={() => changeFontSize(2)}
            />

            {/* Alignment */}
            <MenuButton
              title="Align Left"
              icon={<FaAlignLeft />}
              onClick={() => alignText("Left")}
            />
            <MenuButton
              title="Align Center"
              icon={<FaAlignCenter />}
              onClick={() => alignText("Center")}
            />
            <MenuButton
              title="Align Right"
              icon={<FaAlignRight />}
              onClick={() => alignText("Right")}
            />

            {/* Links and tools */}
            <MenuButton
              title="Insert Link"
              icon={<FaLink />}
              onClick={toggleLink}
            />
            <MenuButton
              title="Grammar Check"
              icon={<FaSpellCheck />}
              onClick={checkGrammar}
            />

            {/* Undo / Redo / Erase */}
            <MenuButton
              title="Undo"
              icon={<FaUndo />}
              onClick={() => document.execCommand("undo")}
            />
            <MenuButton
              title="Redo"
              icon={<FaRedo />}
              onClick={() => document.execCommand("redo")}
            />
            <MenuButton
              title="Clear Formatting"
              icon={<FaEraser />}
              onClick={() => document.execCommand("removeFormat")}
            />

            {/* Text color */}
            <MenuButton
              title="Text Color"
              icon={<FaPalette />}
              onClick={() => setShowTextColor(!showTextColor)}
            />
            {showTextColor && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <SketchPicker
                  onChangeComplete={(color) => applyColor("foreColor", color)}
                />
              </div>
            )}

            {/* Background color */}
            <MenuButton
              title="Background Color"
              icon={<FaPalette />}
              onClick={() => setShowBgColor(!showBgColor)}
            />
            {showBgColor && (
              <div className="absolute top-full mt-2 left-48 z-50">
                <SketchPicker
                  onChangeComplete={(color) => applyColor("hiliteColor", color)}
                />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Highlightmenubar;
