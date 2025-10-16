import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FormSection from "./components/form-section";

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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormSection sectionName="Personal Information" fields={fields} />
  </StrictMode>,
);
