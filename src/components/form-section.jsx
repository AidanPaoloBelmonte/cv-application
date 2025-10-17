import { useState } from "react";
import { useForm } from "react-hook-form";

import FormEntry from "./form-entry";

import "../styles/style.css";

function FormSection({ sectionName, code, className, extendable, fields }) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: "OnChange" });
  const [submitted, setSubmitStatus] = useState(false);
  const [extensions, changeExtensionCount] = useState(1);

  const handleSubmitStateChange = (e) => {
    setSubmitStatus(!submitted);

    e.preventDefault();
  };

  const generateEntries = (key = `${code}0`) => {
    return fields.map((field) => (
      <FormEntry
        {...register(field.name, {
          required: true,
          pattern: RegExp(field?.pattern),
        })}
        {...field}
        asPlain={submitted}
        keycode={key}
        key={`${field.name}-${key ? key : ""}`}
      ></FormEntry>
    ));
  };

  const formEntries = generateEntries();

  const expandableEntries = [];
  if (extendable) {
    for (let l = 0; l < extensions; l++) {
      const key = `${code}${l}`;
      expandableEntries.push(
        <div key={key} className="extendGroup">
          {generateEntries(key)}
        </div>,
      );
    }
  }

  return (
    <div className={className}>
      <div className="formContainer">
        <div className="sectionName">
          <h2>{sectionName}</h2>
        </div>
        <form onSubmit={handleSubmit()}>
          {extendable ? expandableEntries : formEntries}
          {extendable ? (
            <div className="extendButton">
              <button submit="button">Add</button>
            </div>
          ) : null}
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
