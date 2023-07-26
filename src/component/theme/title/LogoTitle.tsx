import { setup } from "@/config/setup";
import { Typography } from "@mui/material";
import router from "next/router";
import React from "react";
import StyledLink from "../navLink/Link";

const LogoTitle = () => {
  return (
    <StyledLink
      href="/"
      style={{
        marginRight: "2rem",
        color: setup.border,
        textDecoration: "none",
      }}
    >
      <Typography
        sx={{
          display: {
            xs: "none",
            sm: "block",
            letterSpacing: ".1rem",
          },
          fontSize: "2rem",
          fontWeight: "700",
          fontFamily: "Roboto Serif",
        }}
      >
        {setup.name}
      </Typography>
      <Typography
        sx={{
          display: {
            fontSize: "1.1rem",
            xs: "none",
            sm: "block",
            letterSpacing: ".1rem",
            fontFamily: "Charm",
            fontWeight: "700",
            textAlign: "center"
          },
        }}
      >
        Decoration and Gift
      </Typography>
    </StyledLink>
  );
};

export default LogoTitle;
