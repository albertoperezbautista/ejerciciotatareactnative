import { User } from "../../interfaces/Usuario";
import { AuthState, DevicePermissions } from "./AuthContext";

type AuthAction =
  | { type: "signIn" }
  | { type: "signOut" }
  | { type: "changeFavIcon"; payload: string }
  | { type: "changeIsLoggedIn"; payload: boolean }
  | { type: "changeIsRegister"; payload: boolean }
  | { type: "changeUser"; payload: User }
  | { type: "checkCameraPermission"; payload: DevicePermissions }
  | { type: "changeIsGlobalLoading"; payload: boolean }
  | { type: "updateUserPhoto"; payload: any };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "signOut":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        favoriteIcon: undefined,
      };

    case "changeFavIcon":
      return {
        ...state,
        favoriteIcon: action.payload,
      };

    case "changeIsLoggedIn":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "changeIsRegister":
      return {
        ...state,
        isRegister: action.payload,
      };
    case "changeUser":
      return {
        ...state,
        user: action.payload,
      };

      case "updateUserPhoto":
        return {
          ...state,
          user: {
            ...state.user,
            photoURL: action.payload
          }
        };

    case "checkCameraPermission":
      return {
        ...state,
        devicePermissions: action.payload,
      };

    case "changeIsGlobalLoading":
      return {
        ...state,
        isGlobalLoading: action.payload,
      };

    default:
      return state;
  }
};
