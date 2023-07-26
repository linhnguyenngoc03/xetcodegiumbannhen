import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSeleton";

interface Props {
  row: number;
  col: number;
}
export default function ProductListSkeleton({ row, col }: Props) {
  const skeletons: any = [];
  const createSkeleton = (row: number, col: number) => {
      for (let i = 0; i < row * col; i++) {
        skeletons.push(
          <Grid item xs={12 / col} key={i}>
            <ProductSkeleton />
          </Grid>
        );
      }
  };
  createSkeleton(row, col);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginBottom: "1rem",
      }}
    >
      {skeletons}
    </Grid>
  );
}
