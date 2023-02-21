import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import Jobs from "./routes/Jobs";
import Root from "./routes/Root";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
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
