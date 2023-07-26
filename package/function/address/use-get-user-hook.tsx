import useSWR from "swr";
import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseGetCartUserUidBody } from "../../model/api/cart/get-user";
import { UseGetAddressUserUidBody } from "../../model/api/address/get-user";

export const UseGetAddressUserUidHook = ({ userUid, }: UseGetAddressUserUidBody) => {
  const url = `http://localhost:3000/api/address/getByUserUid?userUid=${userUid}`;
  const props: FetcherProps = {
    method: "GET"
  };
  const { data, isLoading, error, mutate } = useSWR<ResponseBody<Address[]>>(
    url,
    (url: string) => fetcher(url, props),{
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate
  };
};
