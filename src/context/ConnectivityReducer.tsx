import { ConnectState } from "./ConectivityContext";

export type UserAction =
| {type : 'refreshStatusConnect'; payload : boolean}
;

export const connectivityReducer = (
    state: ConnectState,
    action: UserAction
  ): ConnectState => {
    switch (action.type) {
      
  
      
      case "refreshStatusConnect":
        return {
          ...state,
          isConnect: action.payload,

        };
  
      default:
        return state;
    }
  };