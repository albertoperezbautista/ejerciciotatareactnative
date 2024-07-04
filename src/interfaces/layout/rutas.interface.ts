export interface IRutaItem {
  path: string;
  element?: React.ReactNode;
  children?: IRutaItem[];
}
