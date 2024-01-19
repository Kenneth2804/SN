import React, { useState } from 'react';
import "../../css/Popup.css"

export default function Popup({ isOpen, onClose, component }) {
  const closePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
    {isOpen && (
      <div className="popup-background">
        <div className="popup">
          <button onClick={closePopup} className="close-button">
            X
          </button>
          {component}
        </div>
      </div>
    )}
  </div>
  );
}
