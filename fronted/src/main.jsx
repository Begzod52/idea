import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContect.jsx";
import { ProductProvider } from "./context/ProductContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
