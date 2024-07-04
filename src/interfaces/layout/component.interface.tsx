export interface IComponent {
  path: string;
  componente?: JSX.Element;
  componenteEdicion?: JSX.Element;
}

export interface IComponentD {
  nombre: string;
  componente: JSX.Element[];
}

export interface DataResult {
  message: string;
  mensajeError: string;
  data: [];
}

export interface DataParams {
  pageNum: number;
  pageSize: number;
}

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
  message? : any
}


export interface DataResultOne {
  message: string;
  mensajeError: string;
  data?: [] ;
}
