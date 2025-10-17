import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FormSection from "./components/form-section";

import entries from "./components/entries.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormSection
      sectionName="Personal Information"
      fields={entries["Personal Information"]}
    />
  </StrictMode>,
);
