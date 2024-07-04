import { createContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { getDataListGeneric } from "../../api/layout.api";
import { userReducer } from "./UserReducer";
import { firebaseApp } from "../../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConnectContext } from "../ConectivityContext";

//Definir lo que voy almacenar
export interface UserState {
  idUsuario?: number;
  emailUser?: string;
  // idPersona?: number;
  idApp?: string;
  Proovedor?: string;
  esJugador?: boolean;
  refresh?: boolean;
  isLogin?: boolean;
}

// Definir el estado inicial
export const userInitialState: UserState = {
  idUsuario: undefined,
  emailUser: undefined,
  // idPersona: undefined,
  idApp: undefined,
  Proovedor: undefined,
  esJugador: false,
  refresh: false,
  isLogin: false,
};

// Usaremos para decirle como luce y que expone el context
export interface UserContextProps {
  userState: UserState;
  updateInfoUser: (userData: any) => void;
  updatePerson: (idPerson: number) => void;
  updateEstadoJugador: (verify: any) => void;
  refreshEstado: (verify: any) => void;
  isLogin: (verify: any) => void;
  clearUser: () => void;
}

// Crear el contexto
export const UserContext = createContext({} as UserContextProps);
const auth = getAuth(firebaseApp);

export const UserProvider = ({ children }: any) => {
  const { authState } = useContext(AuthContext);
  const { connectState } = useContext(ConnectContext);

  const [userData, setUserData] = useState<UserState | null>(null);
  const [userState, dispatch] = useReducer(userReducer, userInitialState);


  //Consultar el nombre del usuario

  const getUserInfo = async () => {
    const servicio = `usuario/getInfoUser/${authState.user?.uid}`;

    const resp = await getDataListGeneric(servicio);

    const { message, data } = resp;
    try {
      if (message === "OK") {
        data.map(async (d) => {
          const datos = {
            idUsuario: d.idUsuario,
            emailUser: d.emailUser,
            // idPersona: d.idPersona,
            idApp: d.idApp,
            Proovedor: d.Proovedor,
            isLogin: true,
          };
          setUserData(datos);
          // Convertir el objeto a cadena JSON
          const datosString = JSON.stringify(datos);
          // Guardar en AsyncStorage
          await AsyncStorage.setItem("usuario", datosString);
        });
      } else {
        setUserData(null);
      }
    } catch (error) {}
  };

  useEffect(() => {
  
    if (authState.user?.uid) {
      getUserInfo();
    }
  }, [authState]);



  
  useEffect(() => {
    updateInfoUser(userData);
  }, [userData]);

  const updateInfoUser = (userData) => {
    dispatch({ type: "updateInfoUser", payload: userData });
  };

  const updatePerson = (idPerson: number) => {
    dispatch({ type: "updatePerson", payload: idPerson });
  };

  // Actualizar estado jugador
  const updateEstadoJugador = (verify) => {
    dispatch({ type: "updateEstadoJugador", payload: verify });
  };

  const refreshEstado = (verify) => {
    dispatch({ type: "refreshEstado", payload: verify });
  };

  const isLogin = (verify) => {
    dispatch({ type: "isLogin", payload: verify });
  };

  const clearUser = () => {
    dispatch({ type: "clearUser", payload: userInitialState });
  };

  return (
    <UserContext.Provider
      value={{
        userState: userState, // Usar los datos de userData si existen, de lo contrario usar el estado inicial
        updateInfoUser,
        updatePerson,
        updateEstadoJugador,
        refreshEstado,
        isLogin,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
