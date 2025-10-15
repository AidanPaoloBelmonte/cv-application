import { useState } from "react";

import "../styles/style.css";

function FormEntry({ name, label, inputType = "field", halfCol = false }) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  let className = "formEntry";
  if (halfCol) className += " halfCol";

  return (
    <>
      <div className={className}>
        <label for={name}>
          {label}
          {!value ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <input
          type={inputType}
          name={name}
          onChange={onChange}
          required
        ></input>
      </div>
    </>
  );
}

function PersonalSection() {
  const [submitted, setSubmitStatus] = useState(false);

  return (
    <div className="personalSection">
      <form>
        <div className="formEntry">
          <h2>Personal Information</h2>
        </div>
        <FormEntry name="firstName" label="First Name" halfCol={true} />
        <FormEntry name="lastName" label="Last Name" halfCol={true} />
        <FormEntry name="emailAdd" label="Email Address" inputType="email" />
        <FormEntry name="phoneNum" label="Phone Number" inputType="tel" />
        <div className="formFooter">
          <button submit="button" onClick={() => setSubmitStatus(true)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalSection;
