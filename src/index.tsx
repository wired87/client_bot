import { createRoot } from "react-dom/client";
import React from "react";
require('./index.tsx');
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";

import "./index.css"
import App from "./App";

const appContainer = document.createElement('div');

appContainer.id = 'my-unique-app-container';
appContainer.style.width = "200px";
appContainer.style.height = "200px";
appContainer.style.position = "relative";
appContainer.style.margin = "auto";
appContainer.style.pointerEvents = "none";
appContainer.style.zIndex = "1999999";
appContainer.style.display = "flex";
appContainer.style.justifyContent = "center";
appContainer.style.alignItems = "center";
appContainer.style.opacity =  "1";
appContainer.style.overflow =  "visible";

document.body.appendChild(appContainer);

const rootContainer = createRoot(appContainer);

rootContainer.render(
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);
