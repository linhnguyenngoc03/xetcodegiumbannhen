import { Product } from ".";

export interface ProductAndCartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}

export interface ProductAndOrderItem {
  orderItemId: number;
  quantity: number;
  product: Product;
}
