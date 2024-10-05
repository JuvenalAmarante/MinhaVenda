import { Category } from "./Category";

export type Sale ={
  id: string;
  valor: number;
  data: Date;
  categoria_id: string;
  categoria: Category
}