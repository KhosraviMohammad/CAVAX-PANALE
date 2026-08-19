import { configureStore, type Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { STORE_CONFIG } from "./constants";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { Persistor, PersistConfig } from "redux-persist";

// Import individual reducers
import { themeReducer, headerReducer, authReducer } from "./reducers";
// Import RTK Query APIs
import { sampleApi } from "./api/sampleApi";
import { authApi } from "./api/authApi";

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  header: headerReducer,
  auth: authReducer,
  [sampleApi.reducerPath]: sampleApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
const isSSR = import.meta.env.MODE === "ssr";
const shouldDisablePersistence = import.meta.env.VITE_DISABLE_REDUX_PERSIST === "true";

let store: AppStore;
let persistor: Persistor | null = null;

const customStorage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

try {
  if (isBrowser && !isSSR && !shouldDisablePersistence) {
    // Browser environment: use redux-persist
    const { persistStore, persistReducer } = await import("redux-persist");

    const persistConfig: PersistConfig<RootState> = {
      key: STORE_CONFIG.PERSIST_KEY,
      storage: customStorage,
      whitelist: [...STORE_CONFIG.PERSIST_WHITELIST],
    };

    const persistedReducer = persistReducer(
      persistConfig,
      rootReducer as unknown as Reducer<RootState>,
    );

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          },
        }).concat(sampleApi.middleware, authApi.middleware),
    });

    persistor = persistStore(store, null, () => {
      console.log("Redux store rehydration completed");
    });
  } else {
    // SSR or persistence disabled: use regular store
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }).concat(sampleApi.middleware, authApi.middleware),
    });
    persistor = null;
  }
} catch (error) {
  console.warn("Failed to setup redux-persist, using regular store:", error);

  // Fallback to regular store if redux-persist fails
  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sampleApi.middleware, authApi.middleware),
  });
  persistor = null;
} finally {
  if (store!) {
    setupListeners(store.dispatch);
  }
}

export { store, persistor };
export type AppDispatch = AppStore["dispatch"];
