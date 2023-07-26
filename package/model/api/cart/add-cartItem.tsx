export interface UseAddCartItemBody<T>{
    cartId?: number,
    productId?: number,
    auth: T | undefined
}