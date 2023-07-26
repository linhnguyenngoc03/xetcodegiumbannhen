import { Cart } from ".";
import { ProductAndCartItem } from "../product/product-and-cartItem";

export interface CartAndCartItemAndProduct {
    cart: Cart,
    productAndCartItemList: ProductAndCartItem[]
}