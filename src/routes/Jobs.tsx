import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { defaultFieldsStep1Data, defaultFieldsStep2Data } from "../data/data";
import "../styles/index.css";

export const JobsFormContext = createContext(null);

export default function Jobs() {
  const [fieldsStep1Data, setFieldsStep1Data] = useState(defaultFieldsStep1Data);
  const [fieldsStep2Data, setFieldsStep2Data] = useState(defaultFieldsStep2Data);

  return (
    <JobsFormContext.Provider value={{ fieldsStep1Data, setFieldsStep1Data, fieldsStep2Data, setFieldsStep2Data }}>
      <div className="app">
        <h1>React hook form POC</h1>
        <Outlet />
      </div>
    </JobsFormContext.Provider>
  );
}
