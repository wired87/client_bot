import { createRoot } from "react-dom/client";
import root from "react-shadow";
import React from "react";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";

import "./index.css"
import App from "./App";

const appContainer = document.createElement('div');
appContainer.id = 'my-unique-app-container';
appContainer.style.width = "200px";
appContainer.style.height = "200px";
appContainer.style.position = "fixed";
appContainer.style.bottom = "0";
appContainer.style.right = "0";
appContainer.style.pointerEvents = "none";
appContainer.style.backgroundColor = "transparent";
appContainer.style.zIndex = "1999999";
appContainer.style.display = "flex";
appContainer.style.justifyContent = "center";
appContainer.style.alignItems = "center";
appContainer.style.opacity =  "1";
appContainer.style.overflow =  "visible";

document.body.appendChild(appContainer);

const rootContainer = createRoot(appContainer);

rootContainer.render(
  <iframe style={{ flexGrow: 1, overflow: "visible", height : "200px",
    width : "200px", opacity: 1, backgroundColor : "transparent",
    pointerEvents : "none", right : "0", bottom : "0", zIndex: 200000 }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </iframe>,
);
//