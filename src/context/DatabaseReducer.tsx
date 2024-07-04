// DatabaseReducer.ts
import { ConnectStateDataBase } from "./DatabaseContext";

export type UserAction = {
  type: "refreshStatusConnectDataBase";
  payload: boolean;
};

export const DatabaseReducer = (
  state: ConnectStateDataBase,
  action: UserAction
): ConnectStateDataBase => {
  switch (action.type) {
    case "refreshStatusConnectDataBase":
      return {
        ...state,
        dataBaseConnect: action.payload,
      };

    default:
      return state;
  }
};
