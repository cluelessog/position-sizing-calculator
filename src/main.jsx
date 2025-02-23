import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Ensure App correctly imports PositionSizingCalculator
import "./index.css"; // ✅ TailwindCSS is applied

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
