import React from "react";
import ReactDOM from "react-dom/client";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import "./styles/index.css";
import Root from "./routes/Root";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Link to={"jobs/step-1"}>
        <h2 style={{ textAlign: "center" }}>Begin</h2>
      </Link>
    ),
  },
  {
    path: "/jobs",
    element: <Root />,
    children: [
      {
        path: "step-1",
        element: <FormStep1 />,
      },
      {
        path: "step-2",
        element: <FormStep2 />,
      },
      {
        path: "step-3",
        element: <FormStep3 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
