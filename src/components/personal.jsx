import { useState } from "react";
import { useForm } from "react-hook-form";

import "../styles/style.css";

function FormEntry({
  name,
  label,
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
      type={inputType}
      name={name}
      onChange={onInputChange}
      onBlur={onBlur}
      ref={ref}
      required
      pattern={pattern}
    ></input>
  ) : (
    <p>{value}</p>
  );

  return (
    <>
      <div className={className}>
        <label for={name}>
          {label}
          {!asPlain && !value ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        {entry}
      </div>
    </>
  );
}

function PersonalSection() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: "OnChange" });
  const [submitted, setSubmitStatus] = useState(false);

  const handleSubmitStateChange = (e) => {
    setSubmitStatus(!submitted);

    e.preventDefault();
  };

  return (
    <div className="personalSection">
      <div className="formContainer">
        <div className="sectionName">
          <h2>Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit()}>
          <FormEntry
            {...register("firstName", { required: true })}
            label="First Name"
            halfCol={true}
            asPlain={submitted}
          />
          <FormEntry
            {...register("lastName", { required: true })}
            label="Last Name"
            halfCol={true}
            asPlain={submitted}
          />
          <FormEntry
            {...register("emailAdd", {
              required: true,
            })}
            label="Email Address"
            inputType="email"
            asPlain={submitted}
          />
          <FormEntry
            {...register("phoneNum", {
              required: true,
              pattern: /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
            })}
            label="Phone Number"
            inputType="tel"
            asPlain={submitted}
            pattern="^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$"
          />
          <div className="formFooter">
            <button
              submit="button"
              onClick={handleSubmitStateChange}
              disabled={(!isDirty || !isValid) && !submitted}
            >
              {submitted ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalSection;
