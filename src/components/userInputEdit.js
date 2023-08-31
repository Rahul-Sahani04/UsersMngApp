import './userInput.css'

function CustomEditInput({ name,  onChangeV, defaultValue }) {

  return (
    <div className="inputBox2">
      <input required="" type="text" defaultValue={defaultValue}  placeholder="Write here..." onChange={onChangeV} />
      {/* <span>{name} :</span> */}
    </div>
  );
}

export default CustomEditInput;