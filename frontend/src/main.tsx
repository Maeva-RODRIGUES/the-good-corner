import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import AdDetails from "./components/Ads/AdDetails.tsx";
import Home from "./components/Home.tsx";
import NewAd from "./components/Ads/NewAd.tsx";
import EditAd from "./components/Ads/EditAd.tsx";
import AdsFromCategory from "./components/Categories/AdsFromCategory.tsx";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  from,
  HttpLink,
  Observable,
} from "@apollo/client";
import AppProvider from "./contexts/AppContext.tsx";
import Checkout from "./components/Checkout.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import Logout from "./components/auth/Logout.tsx";
import ProtectedArea from "./components/auth/ProtectedArea.tsx";
import { onError } from "@apollo/client/link/error";
import PaymentSuccess from "./components/payment/PaymentSuccess.tsx";
import PaymentCancel from "./components/payment/PaymentCancel.tsx";
// Création du httpLink séparément car on va l'utiliser avec from()
const httpLink = new HttpLink({
  uri: "http://localhost:4005",
  credentials: "include",
});
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "TOKEN_EXPIRED") {
        return new Observable((observer) => {
          fetch("http://localhost:4005/auth/refresh", {
            method: "POST",
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) throw new Error("Refresh failed");
              // Réessayer la requête originale
              const subscriber = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
              return () => subscriber.unsubscribe();
            })
            .catch(() => {
              window.location.href = "/login";
              observer.complete();
            });
        });
      }
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // uri: "http://localhost:4005",
  link: from([errorLink, httpLink]),
  // credentials: "include",
});

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
      {
        path: "/ads/create",
        element: (
          <ProtectedArea>
            <NewAd />
          </ProtectedArea>
        ),
      },
      { path: "/categories/:id", element: <AdsFromCategory /> },
      { path: "/cart/checkout", element: <Checkout /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/logout", element: <Logout /> },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/cancel", element: <PaymentCancel /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </ApolloProvider>
);