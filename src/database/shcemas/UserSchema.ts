import SQLite from 'react-native-sqlite-storage';

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  try {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS Users (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_usuario TEXT,
        contrasena TEXT,
        fecha_registro TEXT,
        fecha_modificacion TEXT,
        usuario_modificacion TEXT,
        estado BOOLEAN,
        dias_vigencia INTEGER,
        temporal TEXT,
        descripcion TEXT,
        email TEXT,
        uid TEXT,
        es_admin BOOLEAN,
        id_app TEXT,
        deletedat TEXT,
        fechaeliminacion TEXT
      );`
    );
  } catch (error) {
    console.error("Error creating tables", error);
  }
};
