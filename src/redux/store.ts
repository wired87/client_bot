import rootReducers from "./rootReducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['knownNonSerializableAction'],
        // Function to check if a value is serializable
        isSerializable: (value: any) => {
          // Customize the serializability check as needed
          if (typeof value === 'function') {
            console.error("Value serializable")
            return true;
          }
          console.log(`Value ${value} not serializable...`)
          return false;
        },
        // Log or throw error after specified number of ignored actions
        warnAfter: 32,
      },
    }),
});

export const persistor = persistStore(store);

export default store;
