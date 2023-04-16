export interface Column {
  name: string;
  type: string;
  size: number;
  isPrimaryKey: boolean;
  comment: string;
}
export interface Table {
  name: string;
  columns: Column[];
  comment: string;
  trigram: string;
}
