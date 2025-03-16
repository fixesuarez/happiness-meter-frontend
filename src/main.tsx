import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import "primereact/resources/themes/lara-dark-amber/theme.css";
import "primeicons/primeicons.css";
import { store } from "@/store/index";
import { Provider } from "react-redux";

import "@/index.css";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-7c3z7c4axhb7p07l.eu.auth0.com"
    clientId="pTTPg6upVzLAwLAAYOntnFPs4C39N1lz"
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>,
);
