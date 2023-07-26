import useSWR from "swr";
import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseGetCartUserUidBody } from "../../model/api/cart/get-user";
import { CartAndCartItemAndProduct } from "../../model/cart/cart-and-cartItem-and-product";

export const UseGetCartUserUidHook = ({ userUid, }: UseGetCartUserUidBody) => {
  const url = `/api/cart?userUid=${userUid}`;
  const props: FetcherProps = {
    method: "GET"
  };
  const { data, isLoading, error, mutate } = useSWR<ResponseBody<CartAndCartItemAndProduct>>(
    url,
    (url: string) => fetcher(url, props),{
      revalidateOnFocus: false
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate
  };
};
