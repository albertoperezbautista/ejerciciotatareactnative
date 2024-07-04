import React, { createContext, useEffect, useReducer } from "react";
import NetInfo from "@react-native-community/netinfo";
import { connectivityReducer } from "./ConnectivityReducer";
import { showAlert, showAlertConfirmate } from "../components/Alerts";

export interface ConnectState {
  isConnect: boolean;
}

export const connectInitialState: ConnectState = {
  isConnect: false,
};

export interface ConnectContextProps {
  connectState: ConnectState;
  updateStatusConnect: (statusConnect: boolean) => void;
}

export const ConnectContext = createContext({} as ConnectContextProps);

export const ConnectProvider = ({ children }: any) => {
  const [connectState, dispatch] = useReducer(
    connectivityReducer,
    connectInitialState
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (connectState.isConnect !== state.isConnected) {
        updateStatusConnect(state.isConnected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [connectState]);

  const updateStatusConnect = (statusConnect: boolean) => {
    dispatch({ type: "refreshStatusConnect", payload: statusConnect });
  };

  return (
    <ConnectContext.Provider
      value={{
        connectState,
        updateStatusConnect,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
