import React from "react";

const Input = ({ name, label, size, onChange, ...rest }) => {
  return (
    <div className={`form-group m-4 col-${size}`}>
      <label htmlFor={`${name}Input`}>{label}</label>
      <input
        {...rest}
        name={name}
        className="form-control form-control-lg"
        id={`${name}Input`}
        onChange={onChange}
        onInvalid={onChange}
        onInput={onChange}
        placeholder="..."
      />
    </div>
  );
};

export default Input;