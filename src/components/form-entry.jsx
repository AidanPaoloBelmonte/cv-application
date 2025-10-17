import { useState } from "react";

function FormEntry({
  name,
  label,
  keycode,
  ref,
  inputType = "field",
  pattern = null,
  onChange,
  onBlur,
  halfCol = false,
  asPlain = false,
}) {
  const [value, setValue] = useState("");

  const onInputChange = (e) => {
    onChange(e);

    setValue(e.target.value);
  };

  let className = "formEntry";
  if (halfCol) className += " halfCol";

  const entry = !asPlain ? (
    <input
      id={name}
      type={inputType}
      name={name}
      onChange={onInputChange}
      onBlur={onBlur}
      ref={ref}
      required
      pattern={pattern}
      key={`input-${keycode}`}
    ></input>
  ) : (
    <p key={`p-${keycode}`}>{value}</p>
  );

  return (
    <>
      <div className={className}>
        <label htmlFor={name} key={`label-${keycode}`}>
          {label}
          {!asPlain && !value ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        {entry}
      </div>
    </>
  );
}

export default FormEntry;
