import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { setup } from "@/config/setup";
import { Product } from "../../../package/model/product";

interface Props {
    productList: Product[],
    row: number,
    col: number
}
export default function ProductList2({ productList, row, col }: Props) {
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [productList]);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "1rem",
        }}
      >
        {productList
          .slice(0 + (page - 1) * (row * col), page * (row * col))
          .map((product: any, key: any) => (
            <Grid item xs={12/col} key={key}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid> 
       <Pagination
        count={Math.floor(productList.length / 9) + 1}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        sx={{
          float: "right",
          marginTop: "1rem",
          "& .MuiButtonBase-root": {
            color: "black",
          },
          // "& .MuiButtonBase-root-MuiPaginationItem-root": {
          "& .Mui-selected": {
            backgroundColor: `${setup.border} !important`,
          },
          // },
          "& .MuiButtonBase-root:hover": {
            background: setup.border,
          },
        }}
        shape="rounded"
        color="primary"
      />
    </>
  );
}
