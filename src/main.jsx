import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import PersonalSection from "./components/personal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersonalSection />
  </StrictMode>,
);
