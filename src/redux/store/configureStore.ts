import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "./rootReducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistRed = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistRed,
});

export const persistor = persistStore(store);
