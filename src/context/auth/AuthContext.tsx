import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import "firebase/firestore";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus } from "react-native-permissions";
import { firebaseApp } from "../../firebase/firebaseConfig";
import { logOut } from "../../firebase/firebaseUsuario";
import { User } from "../../interfaces/Usuario";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//definir como luce, (este es el estado que voy a manejar globalemente),  que informacion tendré aquí

export interface DevicePermissions {
  cameraStatus: PermissionStatus;
}

export interface AuthState {
  isLoggedIn: boolean | null;
  isRegister: boolean | null;
  favoriteIcon?: string;
  user: User | null;
  devicePermissions: DevicePermissions;
  refresh?: boolean;
  isGlobalLoading: boolean;
}

//lo usaremos para decirle a react como luce y que expone el context
export interface AuthContextProps {
  authState: AuthState;
  signIn: () => void;
  signOut: () => void;
  changeFavoriteIcon: (iconName: string) => void;
  changeIsLoggedIn: (logged: boolean) => void;
  changeIsRegister: (logged: boolean) => void;
  changeUser: (user: User) => void;
  checkCameraPermission: () => void;
  changeIsGlobalLoading: (isLoading: boolean) => void;
  updatePhotoURL : (newPhotoURL: any) => void
  
  
}

export const initDevicePermission: DevicePermissions = {
  cameraStatus: "unavailable",
};

//crear el contexto

export const AuthContext = createContext({} as AuthContextProps);

//componente que es el proveedor del estado
export const AuthProvider = ({ children }: any) => {
  const navigation = useNavigation<any>();
  const authInitialState: AuthState = {
    isLoggedIn: null,
    favoriteIcon: undefined,
    user: null,
    devicePermissions: initDevicePermission,
    isRegister: false,
    isGlobalLoading: true,
  };

  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    //escucha cuando el usuario se loguea o se desloguea del firebase

    onAuthStateChanged(auth, async (user) => {
      // const identificadorPersona = getUserByUid();

      if (user) {
        // Obtener el id del usuario
        const usuario: User = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          providerData: user?.providerData,
          phoneNumber: "98766",
          idUsuario: null,
        };

        if (user && user.photoURL) {
          await AsyncStorage.setItem("userPhoto", user.photoURL);
        }

        changeUser(usuario);
        signIn();
      } else {
        signOut();
        changeIsLoggedIn(false);
      }
    });

    checkCameraPermission();

    //TODO: es interesante este estado ya que permite saber si esta en pantalla activda, inactiva o corriendo en backgroud

    AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        return;
      }

      checkCameraPermission();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = () => {
    dispatch({ type: "signIn" });
  };

  const signOut = async () => {
    await logOut();
    dispatch({ type: "signOut" });
  };

  const changeFavoriteIcon = (iconName: string) => {
    dispatch({ type: "changeFavIcon", payload: iconName });
  };

  const changeUser = (user: User) => {
    dispatch({ type: "changeUser", payload: user });
  };

  const changeIsLoggedIn = (logged: boolean) => {
    dispatch({ type: "changeIsLoggedIn", payload: logged });
  };

  const changeIsRegister = (isRegister: boolean) => {
    dispatch({ type: "changeIsRegister", payload: isRegister });
  };

  const updatePhotoURL = (newPhotoURL: any) => {
    dispatch({ type: "updateUserPhoto", payload: newPhotoURL });
  };

  const checkCameraPermission = async () => {
    let permissionCameraStatus: PermissionStatus;

    if (Platform.OS === "ios") {
      permissionCameraStatus = await check(PERMISSIONS.IOS.CAMERA);
    } else {
      permissionCameraStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    }
    dispatch({
      type: "checkCameraPermission",
      payload: {
        cameraStatus: permissionCameraStatus,
      },
    });
  };

  const changeIsGlobalLoading = (isLoading: boolean) => {
    dispatch({ type: "changeIsGlobalLoading", payload: isLoading });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        signIn: signIn,
        signOut: signOut,
        changeFavoriteIcon: changeFavoriteIcon,
        changeUser: changeUser,
        changeIsLoggedIn: changeIsLoggedIn,
        changeIsRegister: changeIsRegister,
        checkCameraPermission: checkCameraPermission,
        changeIsGlobalLoading: changeIsGlobalLoading,
        updatePhotoURL: updatePhotoURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
