import ProductList1 from "@/component/product/ProductList1";
import Layout1 from "@/component/theme/layout/Layout1";
import TopBanner from "@/component/theme/banner/top-banner";
import { UseGetCategoryProduct } from "../../package/function/category/use-get-product";
import { ResponseBody } from "../../package/model/api";
import { CategoryAndProduct } from "../../package/model/category/category-and-product";


export async function getServerSideProps() {
  const response: ResponseBody<CategoryAndProduct> =
    await UseGetCategoryProduct();
    const categoryAndProduct = response.data;
  const slider = ["slider1.jpg", "slider2.jpg", "slider3.jpg"];
  return {
    props: {
      slider,
      categoryAndProduct: categoryAndProduct? categoryAndProduct : []
    },
  };
}
interface Props {
  categoryAndProduct: any[];
  slider: string[];
}



export default function Home({ categoryAndProduct, slider }: Props) {
  return (
    <TopBanner slider={slider}>
      <Layout1>
        {categoryAndProduct.map((item: any, key: number) => (
          <ProductList1 categoryAndProduct={item} key={key} number={4} />
        ))}
      </Layout1>
    </TopBanner>
  );
}
