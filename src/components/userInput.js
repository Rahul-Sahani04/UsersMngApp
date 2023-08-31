import './userInput.css'

function CustomInput({ name, setNewValue}) {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setNewValue(newValue);
  };

  return (
    <div className="inputBox">
      <input required="" type="text"  placeholder="Write here..." onChange={handleInputChange} />
      <span>{name} :</span>
    </div>
  );
}

export default CustomInput;