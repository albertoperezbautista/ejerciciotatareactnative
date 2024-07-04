export interface ErroresValidacionConsultaViaje {
  errorOrigen: string | null;
  errorDestino: string | null;
  errorFecha: string | null;
}

export interface ErroresValidacionRegistroViaje {
  errorOrigen: string | null;
  errorDestino: string | null;
}


export interface confAlert {
  type: string;
  title: string;
  textBody: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  callback: () => void;
  cancelCallback?: () => void;
}

export interface RefObjectAlert {
  openDialog: (config: confAlert) => void;
  closeDialog: () => void;
}

