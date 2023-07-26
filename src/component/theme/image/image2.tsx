import { CardMedia } from "@mui/material";
import React from "react";

export default function ImageDetail({ img }: {img: string}) {
  return (
    <CardMedia
      component="img"
      alt="green iguana"
      image={"/assets/images/" + img}
      sx={{
        height: "335px",
      }}
    />
  );
}
