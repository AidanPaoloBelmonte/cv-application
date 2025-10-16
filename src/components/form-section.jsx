import { useState } from "react";
import { useForm } from "react-hook-form";

import FormEntry from "./form-entry";

import "../styles/style.css";

function FormSection({ sectionName, fields }) {
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
          <h2>{sectionName}</h2>
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

export default FormSection;
