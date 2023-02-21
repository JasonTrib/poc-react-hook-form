import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { defaultFieldData } from "../data/data";
import "../styles/index.css";

export const JobsFormContext = createContext(null);

export default function Jobs() {
  const [state, setState] = useState(defaultFieldData);

  return (
    <JobsFormContext.Provider value={{ formData: state, setFormData: setState }}>
      <div className="app">
        <h1>React hook form POC</h1>
        <Outlet />
      </div>
    </JobsFormContext.Provider>
  );
}
