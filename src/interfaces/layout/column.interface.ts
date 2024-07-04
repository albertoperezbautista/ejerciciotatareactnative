export interface IColumnItem {
  [x: string]: any; // este sirve para idMaestro, lo utilizo para los tabs
  nombre: string;
  cabecera: string;
  idTipoColumna: number;
  servicio: string;

  parametroservicio: boolean;
  sololectura: boolean;
  visible: boolean;
  width: number;
  maxlength: number | null;
  minlength: number | null;
  min: number | null;
  max: number | null;
  requerido: boolean;
  editable: boolean;
  nuevo: boolean;
  expresionRegular: string | null;
  errorExpresionRegular: string | null;

  visibleTab: boolean | null;
  servicioTab: string | null;
  menuTab: number | null;

  visibleBusqueda: boolean | null;
  servicioBusqueda: string | null;
  menuBusqueda: number | null;

  columnaLabelBusqueda: string | null;
}

export interface IColumnGrid {
  accessorKey?: string;
  enableClickToCopy?: boolean;
  header?: string;
  size?: number;
  muiTableBodyCellEditTextFieldProps?: any;
}

export interface ColumnResult {
  message: string;
  data: IColumnItem[];
}

export interface Combo {
  value: number;
  label: string;
}


export interface NameLeague {
  message: string;
  data: any;
}

export interface GetImage {
  message: string;
  data: any;
}



export interface GetImageByPlayer {
  message: string;
  auxfotJugador : any;
  auxcedFrontal : any;
  auxcedAnverso : any;
}



export interface GetCarnet {
  message: string;
  data: any;
}


export interface getData {
  message: string;
  data: any;
}