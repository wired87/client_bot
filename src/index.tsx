import { createRoot } from "react-dom/client";
import App from "./App";
import root from "react-shadow";
import React from "react";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";
import ReactDOM from "react-dom"

import "./index.css"

const appContainer = document.createElement('div');
appContainer.id = 'my-unique-app-container';
appContainer.style.width = "200px";
appContainer.style.height = "200px";
appContainer.style.position = "fixed";
appContainer.style.bottom = "0";
appContainer.style.right = "0";
appContainer.style.pointerEvents = "none";
appContainer.style.backgroundColor = "transparent";

document.body.appendChild(appContainer);

const rootContainer = createRoot(appContainer);

rootContainer.render(
  <root.div>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        {ReactDOM.createPortal(
          <App />,
          document.body // Portal-Ziel ist der body des Dokuments oder ein spezifischerer Ort nach Wunsch
        )}
      </PersistGate>
    </Provider>
  </root.div>
);
