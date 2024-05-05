import { createRoot } from "react-dom/client";
import App from "./App";
import root from "react-shadow";
import React from "react";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, { persistor } from "./redux/store";

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
        <App />
      </PersistGate>
    </Provider>
  </root.div>
);





/*
Rollup:
"@rollup/plugin-commonjs": "^25.0.7",
"@rollup/plugin-json": "^6.1.0",
"@rollup/plugin-node-resolve": "^15.2.3",
"@rollup/plugin-replace": "^5.0.5",
"@rollup/plugin-typescript": "^11.1.6",
"rollup": "^2.79.1",
"rollup-plugin-delete": "^2.0.0",
"rollup-plugin-postcss": "^4.0.2",
"rollup-plugin-terser": "^7.0.2",
"rollup-plugin-node-polyfills": "^0.2.1",
"rollup-plugin-shim": "^1.0.0",
"@rollup/plugin-alias": "^5.1.0",

<link rel="stylesheet" href="./index.css" />
<link rel="stylesheet" href="react-activity/dist/Spinner.css" />
<link rel="stylesheet" href="react-activity/dist/Bounce.css" />
<style type="text/css">{}</style>
<style type="text/css">{}</style>
<style type="text/css">{}</style>
 */