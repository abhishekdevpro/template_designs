const SectionDivider = ({ title, backgroundColor }) => {
  return (
    <div className="flex items-center mb-2 mt-8">
      <div
        className="flex-grow border-t-4"
        style={{ borderTop: `3px solid ${backgroundColor}` }}
      />
      <h2
        style={{ backgroundColor }}
        contentEditable
        suppressContentEditableWarning
        className="text-xl font-semibold px-4 text-center text-white"
      >
        {title}
      </h2>
      <div
        className="flex-grow border-t-4"
        style={{ borderTop: `3px solid ${backgroundColor}` }}
      />
    </div>
  );
};

export default SectionDivider;