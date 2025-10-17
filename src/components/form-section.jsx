import { useState } from "react";
import { useForm } from "react-hook-form";

import FormEntry from "./form-entry";

import "../styles/style.css";

function FormSection({ sectionName, code, className, extendable, fields }) {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: "OnChange" });
  const [submitted, setSubmitStatus] = useState(false);
  const [extensionCount, setExtensionCount] = useState(1);

  const handleSubmitStateChange = (e) => {
    setSubmitStatus(!submitted);

    e.preventDefault();
  };

  const incrementExtensions = (e) => {
    const newAmount = extensionCount + 1;
    setExtensionCount(newAmount);

    e.preventDefault();
  };

  const decrementExtensions = (e) => {
    const newAmount = Math.max(extensionCount - 1, 1);
    fields.forEach((field) => {
      unregister(`${field.name}-${code}${newAmount}`);
    });

    setExtensionCount(newAmount);

    e.preventDefault();
  };

  const generateEntries = (index = 0, renderLabelCount = false) => {
    const keycode = `${code}${index}`;

    return fields.map((field) => (
      <FormEntry
        {...register(`${field.name}-${keycode}`, {
          required: true,
          pattern: RegExp(field?.pattern),
        })}
        {...field}
        index={parseInt(index) + 1}
        keycode={keycode}
        key={`${field.name}-${keycode}`}
        renderLabel={index == 0}
        renderLabelCount={renderLabelCount}
        asPlain={submitted}
      ></FormEntry>
    ));
  };

  const generateGroups = () => {
    const entries = [];

    for (let l = 0; l < extensionCount; l++) {
      const index = `${l}`;
      entries.push(
        <div key={index} className="extendGroup">
          {generateEntries(index, true)}
        </div>,
      );
    }

    return entries;
  };

  return (
    <div className={`formSection ${className}`}>
      <div className="formContainer">
        <div className="sectionName">
          <h2>{sectionName}</h2>
        </div>
        <form onSubmit={handleSubmit()}>
          {extendable ? generateGroups() : generateEntries()}
          {submitted || !extendable ? null : (
            <>
              <div className="extendButton" key={`${className}-exBtn`}>
                <button submit="button" onClick={incrementExtensions}>
                  Add
                </button>
              </div>
              {extensionCount <= 1 ? null : (
                <div className="extendButton" key={`${className}-rdBtn`}>
                  <button submit="button" onClick={decrementExtensions}>
                    Remove
                  </button>
                </div>
              )}
            </>
          )}
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
