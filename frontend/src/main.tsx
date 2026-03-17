import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css"
import "./styles/form.css"
import "./styles/table.css"
import "./styles/layout.css"

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>
);