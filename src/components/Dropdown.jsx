import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative">
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded inline-flex items-center">
        <span>{selectedOption.label}</span>
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul className="absolute hidden bg-white border rounded mt-1 shadow-md">
        {options.map((option) => (
          <li
            key={option.key}
            className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
