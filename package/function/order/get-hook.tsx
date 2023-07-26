import { CategoryAndProduct } from "../../model/category/category-and-product";
import { FetcherProps, fetcher } from "../../fetcher";
import { UseGetOrderBody } from "../../model/order/get";
import useSWR from "swr";
import { ResponseBody } from "../../model/api";
import { OrderAndOrderItem } from "../../model/order";

export const UseGetOrderHook = ({ userId }: UseGetOrderBody) => {
  const url = `http://localhost:3000/api/order/getOrder?userId=${userId}`;
  const props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const { data, isLoading, error, mutate } = useSWR<ResponseBody<OrderAndOrderItem[]>>(
    url,
    (url: string) => fetcher(url, props),{
      revalidateOnFocus: false,
      dedupingInterval: 20000
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate
  };
};
