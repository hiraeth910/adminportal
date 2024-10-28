// store.js or your store configuration file
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducer from "./reducer"; // Your root reducer

// Create a persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  // No need to explicitly pass middleware
});

// Create a persistor
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
