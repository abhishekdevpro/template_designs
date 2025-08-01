import React, { useState } from 'react';

const colors = [
  { name: 'None', value: '' },
  { name: 'Nobel Grey', value: '#8e8e8e' },
  { name: 'Oxford Blue', value: '#002147' },
  { name: 'Electric Lilac', value: '#b19cd9' },
  { name: 'Olympic Blue', value: '#0094c6' },
  { name: 'Turquoise', value: '#00b5ad' },
  { name: 'Jungle Green', value: '#029e73' },
  { name: 'Indian Red', value: '#cd5c5c' },
  { name: 'Tuscan Yellow', value: '#f7c52b' },
];

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative flex items-center m-2  ">
      <button
        onClick={handleToggleDropdown}
        className="rounded-lg border-2 border-white px-6 py-2 font-bold  bg-white text-white"
        style={{ backgroundColor: selectedColor || "transparent" }}
      >
        Heading Text Color
      </button>
      {isOpen && (
        <div className="absolute top-10 mt-2 right-10 bg-white border rounded-3xl shadow-lg z-50">
          <div className="flex  p-5 space-x-4 bg-white  rounded-3xl">
            {colors.map((color, index) => {
              const style = color.value
                ? { backgroundColor: color.value }
                : { backgroundColor: "transparent" };

              return (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    selectedColor === color.value
                      ? "border-blue-80 shadow-lg shadow-blue-500"
                      : "border-gray-300"
                  }`}
                  style={style}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;