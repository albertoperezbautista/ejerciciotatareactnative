export interface IInscripcionItem {
  idInscripcion: number;
  idEquipo: number;
  nombreEquipo: string;
  imagenEquipo: string;
}

export interface InscripcionResult {
  message: string;
  data: IInscripcionItem[];
}
