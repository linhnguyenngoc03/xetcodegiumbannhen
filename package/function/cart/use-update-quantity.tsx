import { auth } from "@/config/firebase";
import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseUpdateCartItemQuantity } from "../../model/api/cart/update-cartItem"
import { CartAndCartItemAndProduct } from "../../model/cart/cart-and-cartItem-and-product";

const UseUpdateQuantity = async({cartItemId, quantity, auth} : UseUpdateCartItemQuantity) => {
    const url = `/api/cart/update-cart`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            cartItemId,
            quantity,
            auth
        },
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data : ResponseBody<CartAndCartItemAndProduct> = await fetcher(url, props)
    return data
}

export default UseUpdateQuantity