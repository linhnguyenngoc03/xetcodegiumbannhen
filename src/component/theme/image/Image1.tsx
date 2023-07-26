import { CardMedia } from "@mui/material";
import React from "react";
import StyledLink from "../navLink/Link";

const UrlImage = ({
  height,
  url,
  img,
}: {
  height: string;
  url: string;
  img: string;
}) => {
  return (
    <StyledLink href={url}>
      <CardMedia
        component="img"
        alt="Product Image" // Update with a meaningful value
        image={img}
        sx={{
          height: height,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </StyledLink>
  );
};

export default UrlImage;
