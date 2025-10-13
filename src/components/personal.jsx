import { useState } from "react";

import "../styles/style.css";

function PersonalSection() {
  const [submitted, submitState] = useState(false);

  return (
    <div className="personalSection">
      <form>
        <div className="formEntry">
          <h2>Personal Information</h2>
        </div>
        <div className="formEntry halfCol">
          <label for="firstName">First Name</label>
          <input type="field" name="firstName"></input>
        </div>
        <div className="formEntry halfCol">
          <label for="LastName">Last Name</label>
          <input type="field" name="LastName"></input>
        </div>
        <div className="formEntry">
          <label for="emailAdd">Email Address</label>
          <input type="email" name="emailAdd"></input>
        </div>
        <div className="formEntry">
          <label for="phoneNum">Phone Number</label>
          <input type="tel" name="phoneNum"></input>
        </div>
      </form>
    </div>
  );
}

export default PersonalSection;
