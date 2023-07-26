import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseGetCartUserUidBody } from "../../model/api/cart/get-user";
import { CartAndCartItemAndProduct } from "../../model/cart/cart-and-cartItem-and-product";

export const UseGetCartUserUid = async ({ userUid }: UseGetCartUserUidBody) => {
  const Props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60
      }
    }
  }
  const response: ResponseBody<CartAndCartItemAndProduct> = await fetcher(`http://localhost:3000/api/cart?userUid=${userUid}`, Props)
  return response
}