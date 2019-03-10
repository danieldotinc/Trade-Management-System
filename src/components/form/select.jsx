import React from "react";
import uuid from "uuid";

const Select = ({ name, label, value, options, size, onChange }) => {
  return (
    <div className={`form-group m-4 col-${size}`}>
      <label htmlFor={`${name}Input`}>{label}</label>
      <select
        className="form-control form-control-lg"
        id={`${name}Input`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={uuid.v4()} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
