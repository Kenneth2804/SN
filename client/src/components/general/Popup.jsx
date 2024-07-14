import React, { useState } from 'react';

export default function Popup({ isOpen, onClose, component }) {
  const closePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-[999]">
          <div className="bg-white bg-opacity-0 rounded-lg shadow-md p-[10vh] max-w-[80%] text-center relative">
            <button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={() => closePopup(false)}
            >
              <XIcon className="w-10 h-10 text-red-500" />
              <span className="sr-only">Close</span>
            </button>
            {component}
          </div>
        </div>
      )}
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
