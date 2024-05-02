import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import root from "react-shadow";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";
import "./index.css";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import { persistor, store } from "./redux/store";

const muiTheme = createTheme({ palette: { mode: "dark" } });

const container = document.getElementById("root");

const rootContainer = createRoot(container!);

rootContainer.render(
  <root.div>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>

        <CssBaseline />
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>

      </ThemeProvider>
    </StyledEngineProvider>
  </root.div>
);
//  <JoyThemeProvider> </JoyThemeProvider>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
