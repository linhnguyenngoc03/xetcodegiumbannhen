import { CategoryAndProduct } from "../../model/category/category-and-product";
import { FetcherProps, fetcher } from "../../fetcher";

export const UseGetCategoryProduct = async () => {
  const url = `http://localhost:8080/api/category/getCategoryAndProduct`;
  const props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      }
    },
  };
  try {
    const data: CategoryAndProduct = await fetcher(url, props);
    return {
      data: data,
      message: "success",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message,
      status: "error",
    };
  }
};
