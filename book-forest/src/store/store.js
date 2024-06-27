import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "page"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);
export default store;
