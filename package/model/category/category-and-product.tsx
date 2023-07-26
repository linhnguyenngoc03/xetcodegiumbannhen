import { Product } from "../product";

export interface CategoryAndProduct {
  categoryId: number;
  categoryName: string;
  productList: Product[];
}

