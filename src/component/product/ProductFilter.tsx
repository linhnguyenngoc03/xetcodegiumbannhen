import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { categoryList, priceList, productStatus } from "@/config/setup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
export default function ProductFilter({
  categoryNumber,
  setCategoryNumber,
  priceNumber,
  setPriceNumber,
  statusNumber,
  setStatusNumber,
}: any) {
  return (
    <Paper>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Category
        </Typography>
        {categoryList.map((item: any, key: any) => (
          <FormControlLabel
            control={
              <Checkbox checked={categoryNumber === item.categoryId ? true : false} />
            }
            label={item.categoryName}
            key={item.categoryId}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={categoryNumber === item.categoryId ? true : false}
            onChange={(_, value) => {
              value === true ? setCategoryNumber(item.categoryId) : setCategoryNumber(-1);
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Price
        </Typography>
        {priceList.map((item: any, key: any) => (
          <FormControlLabel
            control={<Checkbox checked={priceNumber === key ? true : false} />}
            label={item.name}
            key={key}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={priceNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setPriceNumber(item.id) : setPriceNumber(-1);
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Trạng thái
        </Typography>
        {productStatus.map((item, key) => (
          <FormControlLabel
            control={<Checkbox checked={statusNumber === key ? true : false} />}
            label={item.name}
            key={key}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={statusNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setStatusNumber(key) : setStatusNumber(-1);
            }}
          />
        ))}
      </div>
    </Paper>
  );
}
