import { UserInfo } from 'firebase/auth';

export interface User {
  uid?: string;
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  photoURL?: string | null | undefined;
  providerData?: UserInfo[] | undefined;
  phoneNumber?: string | null | undefined;
  idUsuario?: any | null | undefined;
}

export interface Usuario {
  correoElectronico: string | undefined;
  createPor: string;
  estado: string;
  rating: number;
  estadoBloqueado: string;
  estadoCambioClave: string;
  estadoUsuario: string;
  fechaBloqueo: Date | null;
  fechaCambioClave: Date | null;
  fechaCreacion: Date;
  idUsuarioFireBase: string | undefined;
  listaRoles: Rol[];
  observacion: string | null;
  password: string;
  persona: Persona;
  username: string | undefined;
}

export interface Rol {
  descripcionRol: string;
  estado: string;
  fechaCreacion: Date;
  idRolFireBase: string;
  nombreRol: string;
}

export interface Persona {
  apellido: string | null;
  celular: string | null;
  direccion: string | null;
  fechaNacimiento: any;
  nombre: string | null;
  nombreCompleto: string | null;
  numeroIdentificacion: string | null;
  razonSocial: string | null;
  segundoApellido: string | null;
  segundoNombre: string | null;
  telefono: string | null;
  tipoIdentificacion: string;
}


