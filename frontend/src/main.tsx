import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import AdDetails from "./components/Ads/AdDetails.tsx";
import Home from "./components/Home.tsx";
import NewAd from "./components/Ads/NewAd.tsx";
import EditAd from "./components/Ads/EditAd.tsx";
import AdsFromCategory from "./components/Categories/AdsFromCategory.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/ads/view/:id", element: <AdDetails /> },
      { path: "/ads/edit/:id", element: <EditAd /> },
      { path: "/ads/create", element: <NewAd /> },
      { path: "/categories/:id", element: <AdsFromCategory /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
