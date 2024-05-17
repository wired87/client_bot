import React from "react";
require('./index.tsx');
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";

import "./index.css"
import App from "./App";
import { createRoot } from "react-dom/client";

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






/*
PREVIEW
<10000000000
import React from "react";
require('./index.tsx');
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";

import "./index.css"
import App from "./App";
import { createRoot } from "react-dom/client";

const goalElement = document.getElementById('preview');
if (goalElement) {

  const appContainer = document.createElement("div");

  appContainer.id = 'preview-content';
  appContainer.style.cssText = `
    width: 800px;
    height: 900px;
    position: relative;
    margin: auto;
    pointer-events: none;
    z-index: 1999999;
    display: flex;
    justify-content: center;
    align-items: end;
    opacity: 1;
    overflow: visible;
    bottom: 0;
  `;

  // Append the new appContainer to the goalElement
  goalElement.appendChild(appContainer);
  const rootContainer = createRoot(appContainer)
  // Use createRoot to render the React component into the appContainer
  rootContainer.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}



 */