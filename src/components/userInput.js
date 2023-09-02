import React, { useState, useEffect } from 'react';
import './userInput.css';

function CustomInput({ name, setNewValue, value }) {
  const [inputValue, setInputValue] = useState(value || ''); // Initialize with the provided value

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setNewValue(newValue);
  };

  return (
    <div className="inputBox">
      <input required={true} type="text" placeholder="Write here..." value={inputValue} onChange={handleInputChange} />
      <span>{name} :</span>
    </div>
  );
}

export default CustomInput;
