// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed   content-center overflow-y-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    
      <div className="bg-white rounded-lg p-5 shadow-lg">
      
        <div className='h-3/4 pt-40'>  {children}</div>
        <button onClick={onClose} className="text-red-500 float-right content-top">Close</button>
      </div>
     
    </div>
  );
};

export default Modal;
