import React, { useEffect, useState } from "react";
import Layout1 from "@/component/theme/layout/Layout1";
import { Grid, Paper, Typography } from "@mui/material";
import ProductFilter from "@/component/product/ProductFilter";
import { useRouter } from "next/router";
import ProductListSkeleton from "@/component/product/ProductListSkeleton";
import { UseSearchProductName } from "../../../package/function/product/use-search-name";
import ProductList2 from "@/component/product/ProductList2";
import { Product } from "../../../package/model/product";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  return {
    props: {
      value: params?.value,
      revalidate: 60
    },
  };
};
interface Props {
  value: string;
}
export default function Search({ value }: Props) {
  const router = useRouter()
  const { data, isLoading, error } = UseSearchProductName({
    productName: value
  });
  const [ productList, setProductList] =  useState<Product[]>(data?.data as Product[])
  const [categoryNumber, setCategoryNumber] = useState(-1);
  const [priceNumber, setPriceNumber] = useState(-1);
  const [statusNumber, setStatusNumber] = useState(-1);
  useEffect(() => {
    let productFilter = data?.data as Product[]
    if (categoryNumber !== -1) {
      productFilter = productFilter.filter((product) => categoryNumber === product.categoryId)
    } 
    if ( priceNumber !== -1){
      if (priceNumber === 0) {
        productFilter = productFilter.filter((product) => product.price < 50000)
      } else if (priceNumber === 1) {
        productFilter = productFilter.filter((product) => 50000 < product.price && product.price < 200000)
      } else if (priceNumber === 2) {
        productFilter = productFilter.filter((product) => 200000 < product.price && product.price < 500000)
      } else if (priceNumber === 3) {
        productFilter = productFilter.filter((product) => 500000 < product.price && product.price < 800000)
      }
    }
    if ( statusNumber !== -1) {
      if (statusNumber === 0) {
        productFilter = productFilter.filter((product) => product.status === "bán chạy")
      } else if (statusNumber === 1) {
        productFilter = productFilter.filter((product) => product.status === "mới")
      }
    }
    setProductList(productFilter)
  }, [categoryNumber, priceNumber, statusNumber, data])
  return (
    <Layout1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ProductFilter
          categoryNumber={categoryNumber}
          setCategoryNumber={setCategoryNumber}
          priceNumber={priceNumber}
          setPriceNumber={setPriceNumber}
          statusNumber={statusNumber}
          setStatusNumber={setStatusNumber}
          />
        </Grid>
        <Grid item xs={9}>
            <Typography variant="h4">
              {`Kết quả tìm kiếm cho "${value}"`}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "gray",
              }}
            >
              {productList?.length} sản phẩm tìm thấy
            </Typography>
          {productList === undefined ? (
            <ProductListSkeleton col={3} row={3} />
          ) : (
            <ProductList2 col={3} row={3} productList={productList} />
          )}
        </Grid>
      </Grid>
    </Layout1>
  );
}
