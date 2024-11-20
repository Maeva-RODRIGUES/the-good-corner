//main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Home from "./components/Home.tsx";
// import AdDetails from "./components/AdDetails.tsx";
import ToDoList from "./components/Exos/TodoList.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // { path: "/ads/:id", element: <AdDetails /> 

      // },
      { path: "/exercice1", element: <ToDoList /> 

      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
