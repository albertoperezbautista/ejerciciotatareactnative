export interface IMenuItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: IMenuItem[];
  type?: string;
  modulo: string;
  servicio?: string;
}

export interface MenuResult {
  message: string;
  data: IMenuItem[];
}
