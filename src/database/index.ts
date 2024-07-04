import SQLite from 'react-native-sqlite-storage';
import { createTables } from './shcemas/UserSchema';
import { insertInitialData } from './shcemas/initialData';
import NetInfo from "@react-native-community/netinfo";


SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Frenec.db";
const database_version = "1.0";
const database_displayname = "SQLite Frenec";
const database_size = 200000;

let db: SQLite.SQLiteDatabase | null = null;
let isDatabaseOpen = false;



export const insertUser = async (user: any) => {
  try {
    if (db && isDatabaseOpen) {
      await db.executeSql(
        `INSERT INTO Users (nombre_usuario, contrasena, fecha_registro, fecha_modificacion, usuario_modificacion, estado, dias_vigencia, temporal, descripcion, email, uid, es_admin, id_app, deletedat, fechaeliminacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [user.nombre_usuario, user.contrasena, user.fecha_registro, user.fecha_modificacion, user.usuario_modificacion, user.estado, user.dias_vigencia, user.temporal, user.descripcion, user.email, user.uid, user.es_admin, user.id_app, user.deletedat, user.fechaeliminacion]
      );
      console.log("User inserted");
    } else {
      console.log("Database is not open. Cannot insert user.");
    }
  } catch (error) {
    console.error("Error inserting user", error);
  }
};

export const getUser = async (email: string) => {
  try {
    if (db && isDatabaseOpen) {
      const results = await db.executeSql(
        `SELECT * FROM Users WHERE email = ?;`,
        [email]
      );
      if (results[0].rows.length > 0) {
        return results[0].rows.item(0);
      }
      return null;
    } else {
      console.log("Database is not open. Cannot get user.");
      return null;
    }
  } catch (error) {
    console.error("Error getting user", error);
    return null;
  }
};

