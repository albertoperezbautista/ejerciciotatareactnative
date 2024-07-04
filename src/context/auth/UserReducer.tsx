// Se usa para mantener un estado, pero vamos a usar un estado mas complejo
// Para los contextos siempre vamos a trabajar con un reducer

import { UserState } from "./UserContext";

//Definir como lucen las acciones

export type UserAction =
  | { type: "updateInfoUser"; payload: any }
  | { type: "updatePerson"; payload: number }
  | { type: "updateEstadoJugador"; payload: boolean }
  | { type: "refreshEstado"; payload: boolean }
  | { type: "isLogin"; payload: boolean }
  | { type: "clearUser"; payload: any }
  | { type: "setGlobalLoading"; payload: any };

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "updateInfoUser":
      //No mutar el estado
      return {
        ...state,
        ...action.payload,
      };

    // case "updatePerson":
    //   return {
    //     ...state,
    //     idPersona: action.payload,
    //   };

    case "updateEstadoJugador":
      return {
        ...state,
        esJugador: action.payload,
      };

    case "refreshEstado":
      return {
        ...state,
        refresh: action.payload,
      };

    case "isLogin":
      return {
        ...state,
        refresh: action.payload,
      };

    case "clearUser":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
