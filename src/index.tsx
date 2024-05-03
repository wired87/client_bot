import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import root from "react-shadow";

import {
  CssBaseline,
} from "@mui/material";
import "./index.css";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import { persistor, store } from "./redux/store";

let container = document.getElementById("root");
if (!container) {
  container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);
}

const rootContainer = createRoot(container);

rootContainer.render(
  <root.div>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <App />
      </PersistGate>
    </Provider>
  </root.div>
);

reportWebVitals();
