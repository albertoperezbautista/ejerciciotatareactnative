import { insertUser } from '../index';
import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const initialUsers = [
  {
    id_usuario: -1,
    nombre_usuario: 'admin',
    contrasena: '$2a$10$B.395uUOdVLTsDnzI863Tu/58PJ6UppfaipuF22XXn4/3enpjQRm.',
    fecha_registro: '2023-11-27 15:56:21.009',
    fecha_modificacion: '2023-11-27 15:56:21.009',
    usuario_modificacion: '',
    estado: true,
    dias_vigencia: 365,
    temporal: '',
    descripcion: '',
    email: '',
    uid: '',
    es_admin: true,
    id_app: '',
    deletedat: '',
    fechaeliminacion: '',
  },
  {
    id_usuario: 2015,
    nombre_usuario: 'prueba@gmail.com',
    contrasena: '$2a$10$gaHU/kMvRlzscDuKDbtjNuDXYPHTJ9yPJXiezPZu8BqvaWB5y2amC',
    fecha_registro: '2024-06-11 16:48:51.190',
    fecha_modificacion: '2024-06-11 16:48:51.190',
    usuario_modificacion: '',
    estado: true,
    dias_vigencia: null,
    temporal: '',
    descripcion: 'Creado desde App',
    email: 'prueba@gmail.com',
    uid: '',
    es_admin: false,
    id_app: '1337140114cb',
    deletedat: '',
    fechaeliminacion: '',
  },
  {
    id_usuario: 2016,
    nombre_usuario: 'kevinb@gmail.com',
    contrasena: '$2a$10$htW1bg.u0Qpj2IcsymDhhuiAjzPgL8yhGKqoI3mjrPAb5thgXqP.6',
    fecha_registro: '2024-06-12 10:18:57.788',
    fecha_modificacion: '2024-06-12 10:18:57.788',
    usuario_modificacion: '',
    estado: true,
    dias_vigencia: null,
    temporal: '',
    descripcion: 'Creado desde App',
    email: 'kevinb@gmail.com',
    uid: '',
    es_admin: false,
    id_app: '1337140114cb',
    deletedat: '',
    fechaeliminacion: '',
  },
];


export const insertInitialData = async (db: SQLite.SQLiteDatabase) => {
  try {
    for (const user of initialUsers) {
      await insertUser(user);
    }
  } catch (error) {
    console.error("Error inserting initial data", error);
  }
};
