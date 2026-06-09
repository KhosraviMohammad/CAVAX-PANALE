import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { STORE_CONFIG } from './constants';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';

// Create a custom storage engine to bypass Vite's CommonJS interop issues with redux-persist
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

// Import individual reducers
import {
  themeReducer,
} from './reducers';

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
});

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
const isSSR = import.meta.env.MODE === 'ssr';
const shouldDisablePersistence = import.meta.env.VITE_DISABLE_REDUX_PERSIST === 'true';

let store: any, persistor: any;

if (isBrowser && !isSSR && !shouldDisablePersistence) {
  const persistConfig = {
    key: STORE_CONFIG.PERSIST_KEY,
    storage: customStorage,
    whitelist: STORE_CONFIG.PERSIST_WHITELIST,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(),
  });

  persistor = persistStore(store, null, () => {
    console.log('Redux store rehydration completed');
  });
} else {
  store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(),
  });

  persistor = null;
}

if (store) {
  setupListeners(store.dispatch);
}

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
