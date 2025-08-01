// components/PrimaryButton.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  variant = "", // add a variant prop
}) => {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    success: "bg-success text-white hover:bg-success/90",
    secondary: "border border-primary text-primary bg-white hover:bg-[#F4F8FF]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant] || ""}
        hover:scale-105 hover:font-semibold transition duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
