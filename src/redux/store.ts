import rootReducers from "./rootReducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// Persisting the main root reducer
const persistRed = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistRed,
});

export const persistor = persistStore(store);