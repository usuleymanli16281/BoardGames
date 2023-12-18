import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Example usage:
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const App = () => {
  const handleSelect = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
    // You can perform additional actions here based on the selected option
  };

  return (
    <div>
      <h1>React Dropdown Example</h1>
      <Dropdown options={options} onSelect={handleSelect} />
    </div>
  );
};