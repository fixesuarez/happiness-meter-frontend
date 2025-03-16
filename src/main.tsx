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
    domain={import.meta.env.VITE_OAUTH_DOMAIN}
    clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/profile`,
    }}
    cacheLocation="localstorage"
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
