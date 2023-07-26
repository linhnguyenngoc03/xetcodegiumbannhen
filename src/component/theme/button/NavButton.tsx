import { setup } from "@/config/setup";
import { MenuItem, Menu } from "@mui/material";
import React from "react";
import { StyledWidgets } from "../icon";
import StyledLink from "../navLink/Link";
import {
  Category,
} from "../../../../package/model/category";

const NavButton = ({ categoryList, isVisible }: { categoryList: Category[], isVisible: boolean }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{
      display: isVisible? "block" : "none",
      translate: "200ms"
    }}>
      <MenuItem
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "&.MuiMenuItem-root": {
            backgroundColor: setup.border,
            fontWeight: "700",
            color: "white",
            borderRadius: "4px",
          },
        }}
      >
        <StyledWidgets size="1.5rem" marginRight="1rem" color="white" />
        Danh mục
      </MenuItem>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          marginTop: "0.5rem",
        }}
      >
        {categoryList.map((item , key) => (
          <StyledLink
            href={`/category/${item.categoryId}`}
            key={key}
            style={{
              color: setup.border,
            }}
          >
            <MenuItem
              sx={{
                width: "240px",
                fontWeight: 700,
              }}
            >
              {item.categoryName}
            </MenuItem>
          </StyledLink>
        ))}
      </Menu>
    </div>
  );
};

export default NavButton;
