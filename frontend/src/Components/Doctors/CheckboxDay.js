import React from "react";

const CheckboxDay = ({ day, isChecked, onChange }) => {
  return (
    <>
      <span>{day}</span>
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
