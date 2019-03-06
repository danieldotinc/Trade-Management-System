import React from "react";

const Input = ({ name, rtlName, value, size, onChange, required }) => {
  return (
    <div className={`form-group m-4 col-${size}`}>
      <label htmlFor={`${name}Input`}>{rtlName}</label>
      <input
        type="text"
        className="form-control form-control-lg"
        id={`${name}Input`}
        name={name}
        onChange={onChange}
        onInvalid={onChange}
        onInput={onChange}
        value={value}
        placeholder="..."
        required={required == "true"}
      />
    </div>
  );
};

export default Input;
