import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Cierra la lista desplegable cuando se selecciona una opción
    onSelect(option.key); // Llama a la función onSelect con el key de la opción seleccionada
  };

  return (
    <div className="relative">
      <button
        className="ml-3 text-gray-700 rounded inline-flex items-center font-bold"
        onClick={() => setIsOpen(!isOpen)} // Cambia el estado de isOpen cuando se hace clic en el botón
      >
        <span className={selectedOption === options ? 'text-blue-600' : ''}>
          {selectedOption.label}
        </span>
        <Icon icon="mdi:chevron-down" className="text-blue-500 ml-1" />
      </button>
      {isOpen && ( // Muestra la lista desplegable solo si isOpen es true
        <ul className="absolute bg-white border rounded mt-1 shadow-md">
          {options.map((option) => (
            <li
              key={option.key}
              className={`py-3 px-3 hover:bg-gray-100 cursor-pointer w-44 ${
                selectedOption.key === option.key ? 'text-blue-600 font-bold border-l-blue-600 border-l-4' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;