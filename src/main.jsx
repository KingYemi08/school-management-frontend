import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
// import GlobalProvider from "../context/GlobalContect.jsx";
import GlobalProvider from "../context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);
