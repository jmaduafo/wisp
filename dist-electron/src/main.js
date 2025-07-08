import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
