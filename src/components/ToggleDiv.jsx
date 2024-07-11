import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const ToggleDiv = ({ title, content }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="w-auto h-auto mx-auto">
      <div
        className={`flex justify-between items-center bg-white p-4 cursor-pointer ${
          showDetails ? 'text-sky-500' : 'text-gray-700'
        }`} // Condición para cambiar el color del texto
        onClick={toggleDetails}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic se propague al div exterior
            toggleDetails();
          }}
        >
          {showDetails ? (
            <Icon icon="mdi:minus" className="text-sky-500 hover:text-sky-700" />
          ) : (
            <Icon icon="mdi:plus" className="text-sky-500 hover:text-sky-700" />
          )}
        </button>
      </div>
      {showDetails && (
        <div className="bg-white p-4">
          <p className="text-gray-800">{content}</p>
        </div>
      )}
    </div>
  );
};

export default ToggleDiv;
