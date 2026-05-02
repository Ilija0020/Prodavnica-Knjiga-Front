import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./core/global.scss";

createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>)
