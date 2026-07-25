import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { MaterialUIProvider } from "@/providers/MaterialUIProvider";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "@/App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ReduxProvider>
        <MaterialUIProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-center"
              hideProgressBar
              closeOnClick
              pauseOnHover
              theme="colored"
            />
          </BrowserRouter>
        </MaterialUIProvider>
      </ReduxProvider>
    </StrictMode>,
  );
}
