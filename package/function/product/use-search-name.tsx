import useSWR from "swr";
import { FetcherProps, fetcher } from "../../fetcher";
import { Product } from "../../model/product";
import { ResponseBody } from "../../model/api";
import { UseSearchProductNameBody } from "../../model/api/product/search-name";

export const UseSearchProductName = ({ productName }: UseSearchProductNameBody) => {
  const url = `/api/product/searchByName?productName=${productName}`;
  const props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const { data, isLoading, error } = useSWR<ResponseBody<Product[]>>(
    url,
    (url) => fetcher(url, props)
  );
  return {
    data,
    isLoading,
    error,
  };
};
