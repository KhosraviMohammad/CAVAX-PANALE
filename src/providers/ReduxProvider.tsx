import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
