import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseAddCartItemBody } from "../../model/api/cart/add-cartItem";
import { CartAndCartItemAndProduct } from "../../model/cart/cart-and-cartItem-and-product";

export const UseAddToCart = async ({productId, cartId, auth}: UseAddCartItemBody<string>) => {
    const url = `/api/cart/add-to-cart`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            productId,
            cartId,
            auth: auth
        },
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data : ResponseBody<CartAndCartItemAndProduct> = await fetcher(url, props)
    return data

};
