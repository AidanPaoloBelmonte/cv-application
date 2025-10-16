import { useState } from "react";
import { useForm } from "react-hook-form";

import FormEntry from "./formEntry";

import "../styles/style.css";

const fields = [
  { name: "firstName", label: "First Name", halfCol: true },
  { name: "lastName", label: "Last Name", halfCol: true },
  { name: "emailAdd", label: "Email Address", inputType: "email" },
  {
    name: "phoneNum",
    label: "Phone Number",
    inputType: "tel",
    registerPattern: /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
    pattern: "^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$",
  },
];

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

  const formEntries = fields.map((field) => (
    <FormEntry
      {...register(field.name, {
        required: true,
        pattern: field?.registerPattern,
      })}
      {...field}
      asPlain={submitted}
    ></FormEntry>
  ));

  return (
    <div className="personalSection">
      <div className="formContainer">
        <div className="sectionName">
          <h2>Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit()}>
          {formEntries}
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
