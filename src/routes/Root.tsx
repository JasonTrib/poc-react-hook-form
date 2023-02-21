import { Outlet } from "react-router-dom";
import "../styles/index.css";

export default function Root() {
  return (
    <div className="app">
      <h1>React hook form POC</h1>
      <Outlet />
    </div>
  );
}
