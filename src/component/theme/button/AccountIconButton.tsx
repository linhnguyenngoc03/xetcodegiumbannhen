import { setup } from "@/config/setup";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import StyledLink from "../navLink/Link";

const AccountIconButton = React.forwardRef(({ href, ...props } : any, ref) => {
  return (
    <StyledLink href={href !== undefined ? href : "/login"}>
      <IconButton
        {...props}
        ref={ref}
        size="large"
        sx={{
          margin: "0 1rem",
          color: "white",
          backgroundColor: setup.border,
        }}
      >
        <PersonIcon />
      </IconButton>
    </StyledLink>
  );
});
AccountIconButton.displayName = "AccountIconButton";
export default AccountIconButton;
