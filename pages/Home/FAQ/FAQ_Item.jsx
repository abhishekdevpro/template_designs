import React, { useState } from 'react';


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border-b-2 border-gray-200 rounded-lg p-4">
      <button
        className="flex justify-between w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-xl">{question}</span>
        <span className=' text-xl font-semibold'>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-lg text-gray-700">
          {answer}
        </p>
      )}
    </div>
  );
};

export default FAQItem;
