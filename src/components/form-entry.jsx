import { useState } from "react";

function FormEntry({
  name,
  label,
  keycode,
  ref,
  classes,
  inputType = "field",
  pattern = null,
  onChange,
  onBlur,
  asPlain = false,
}) {
  const [value, setValue] = useState("");

  const onInputChange = (e) => {
    onChange(e);

    setValue(e.target.value);
  };

  let className = `formEntry ${classes}`;

  const entry = !asPlain ? (
    <input
      id={`${name}-${keycode}`}
      className={classes}
      type={inputType}
      name={`${name}-${keycode}`}
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
        <label htmlFor={`${name}-${keycode}`} key={`label-${keycode}`}>
          {label}
          {!asPlain && !value ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        {entry}
      </div>
    </>
  );
}

export default FormEntry;
