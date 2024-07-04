export type TagItem = {
  id: number;
  idMenu: number;

  label: string;

  nombre: string;
  titulo: string;

  /** tag's route path */
  key: string;

  /** can be closed ? */
  closable: boolean;

  modulo?: string;
  servicio?: string;
  formulario?: string;
};

export interface TagState {
  /** tagsView list */
  tags: TagItem[];

  /**current tagView id */
  activeTagId: TagItem['key'];
}
