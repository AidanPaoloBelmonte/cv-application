import { useState } from "react";

function FormEntry({
  name,
  label,
  index,
  keycode,
  ref,
  classes,
  inputType = "field",
  pattern = null,
  onChange,
  onBlur,
  renderLabel = true,
  renderLabelCount = false,
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

  const entryLabel = asPlain ? (
    <span className="labelSub" key={`label-${keycode}`}>
      {renderLabel ? label : null}
    </span>
  ) : (
    <label htmlFor={`${name}-${keycode}`} key={`label-${keycode}`}>
      {label}
      {renderLabelCount ? ` ${index}` : null}
      {!asPlain && !value ? <span style={{ color: "red" }}>*</span> : null}
    </label>
  );

  return (
    <>
      <div className={className}>
        {entryLabel}
        {entry}
      </div>
    </>
  );
}

export default FormEntry;
