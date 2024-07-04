import React, { createContext, useEffect, useReducer, useState } from "react";
import { DatabaseReducer } from "./DatabaseReducer";
import NetInfo from "@react-native-community/netinfo";
import { createTables } from "../database/shcemas/UserSchema";
import { useNetInfoInstance } from "@react-native-community/netinfo";
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { addEventListener } from "@react-native-community/netinfo";
import { showAlert } from "../components/Alerts";
import { insertInitialData } from "../database/shcemas/initialData";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Frenec.db";
const database_version = "1.0";
const database_displayname = "SQLite Frenec";
const database_size = 200000;

let dbInstance: SQLiteDatabase | null = null; // Declaración global de dbInstance


export interface ConnectStateDataBase {
  dataBaseConnect: boolean;
}

export interface DataBaseContextProps {
  connectStateDataBase: ConnectStateDataBase;
  updateStatusConnectDatabase: (statusConnect: boolean) => void;
}

export const DatabaseContext = createContext({} as DataBaseContextProps);

export const DatabaseProvider = ({ children }) => {
  const [connectStateDataBase, dispatch] = useReducer(DatabaseReducer, {
    dataBaseConnect: false,
  } as ConnectStateDataBase);

  const [estadoConexion, setEstadoConexion] = useState<any>(false);
  const [dbInitialized, setDbInitialized] = useState(false);

  const initDatabase = async () => {
    try {
      // Abre la conexión con la base de datos
      const dbInstance: SQLiteDatabase = await SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
      );
  
      // Crea las tablas si no existen
      await createTables(dbInstance);
      console.log("Tables created");
  
      // Inserta datos iniciales si es necesario
      await insertInitialData(dbInstance);
      console.log("Initial data inserted");
      console.warn("Database ABIERTAAA");

  
      return dbInstance; // Devuelve la instancia de la base de datos
  
    } catch (error) {
      console.error("Error initializing database", error);
      throw error; // Propaga el error para manejarlo en el componente que llama a initDatabase()
    }
  };

   const closeDatabase = () => {
  if (dbInstance) {
    dbInstance.close()
      .then(() => {
        console.warn("Database CERADAAA");
        dbInstance = null; // Limpia la instancia de la base de datos
      })
      .catch(error => {
        console.error("Error closing database", error);
      });
  } else {
    console.warn("No open database connection found");
  }
};

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    const isConnected = state.isConnected;
    if (isConnected !== estadoConexion) {
      setEstadoConexion(isConnected);
      if (isConnected && dbInitialized) {
        closeDatabase(); // Cierra la base de datos si hay conexión y está inicializada
        setDbInitialized(false); // Marca la base de datos como no inicializada
      } else if (!isConnected && !dbInitialized) {
        initDatabase(); // Inicializa la base de datos si NO hay conexión y no está inicializada
        setDbInitialized(true); // Marca la base de datos como inicializada
      }
      showAlert(isConnected ? "Conectado" : "Desconectado");
    }
  });

  return () => {
    unsubscribe();
  };
}, [estadoConexion, dbInitialized]); 

  console.log("EstadoConexión::::", estadoConexion);

  const updateStatusConnectDatabase = (statusConnect: boolean) => {
    dispatch({ type: "refreshStatusConnectDataBase", payload: statusConnect });
  };

  return (
    <DatabaseContext.Provider
      value={{
        connectStateDataBase,
        updateStatusConnectDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
