import React from "react";

const CheckboxDay = ({ day, isChecked, onChange }) => {
  //a checkbox component to easily replicate checkbox creation
  return (
    <>
      <span className="day">{day}</span>
      <input
        type="checkbox"
        name={`days-${day}`}
        value={day}
        onChange={onChange}
        checked={isChecked}
      />
    </>
  );
};

export default CheckboxDay;
