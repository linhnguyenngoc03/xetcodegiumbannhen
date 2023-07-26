import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseAddCartItemBody } from "../../model/api/cart/add-cartItem";
import { UseDeleteCartItemBody } from "../../model/api/cart/delete-cartItem";

export const UseDeleteCartItem = async ({ cartItemId }: UseDeleteCartItemBody) => {
  const url = `/api/cart/delete-cart?cartItemId=${cartItemId}`;
  const props: FetcherProps = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const data: ResponseBody<null> = await fetcher(
    url,
    props
  );
  return data;
};
