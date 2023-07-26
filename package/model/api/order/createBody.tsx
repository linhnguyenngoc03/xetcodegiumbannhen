import { CartItems } from "../../cartItems";
import { ProductAndCartItem } from "../../product/product-and-cartItem";

export interface UseCreateOrderBody {
    userUid?: string,
    cartItemsList?: ProductAndCartItem[],
    deliveryAddressId?: number,
    paymentId?: number,
    totalPayment: number
    note?: string 
}