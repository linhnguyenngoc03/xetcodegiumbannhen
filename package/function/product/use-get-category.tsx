import { FetcherProps, fetcher } from "../../fetcher";
import { UseGetProductCategoryBody } from "../../model/api/product/get-category";
import { Product } from "../../model/product";

export const UseGetProductCategory = async ({categoryId} : UseGetProductCategoryBody) => {
  const url = `http://localhost:8080/api/product/filterByCategory?categoryId=${categoryId}`;
  const props : FetcherProps = {
    method: "GET",
    options: {
        next: {
            revalidate: 60
        }
    }
  }
  try {
    const data : Product[] = await fetcher(url, props)
    return {
        data: data,
        message: "success",
        status: "success"
    }
  } catch( error : any ) {
    return {
        data: null,
        message: error.message,
        status: "error"
    }
  }
};
