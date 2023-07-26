import { setup } from "@/config/setup";
import { Button, Paper, Typography } from "@mui/material";
import CardGiftcardSharpIcon from "@mui/icons-material/CardGiftcardSharp";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from "react";
import { useRouter } from "next/router";

export default function NavigationLeft() {
  const router = useRouter();
  const navBarLeftItems = [
    { name: "Sản phầm", url: "/admin/product" },
    { name: "Đơn hàng", url: "/admin/order" },
    { name: "Góp ý", url: "/admin/feedback" },
  ];
  return (
    <Paper
      sx={{
        width: "16rem",
        height: "100vh",
        backgroundColor: "#0f1a34",
        color: setup.color,
        position: "fixed",
        boxShadow: "none",
        zIndex: "3",
      }}
    >
      <div style={{
        backgroundColor: "#182444"
      }}>
        <Button
          sx={{
            color: "white",
            fontSize: "2rem",
            fontWeight: "700",
            height: "80px",
            fontFamily: 'Camel'
          }}
          fullWidth
        >
          {/* <CardGiftcardSharpIcon
          sx={{
            width: "2.5rem",
            height: "2.5rem",
          }}
        /> */}
          {setup.name}
        </Button>
      </div>
      {navBarLeftItems.map((navBarLeftItem, key) => (
        <Typography
          key={key}
          sx={{
            cursor: "pointer",
            color: "white",
            fontWeight: "500",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 1.4rem 1rem 1.4rem",
            ":hover" : {
              backgroundColor: "#091023",
            }
          }}
          onClick={() => {
            router.push(navBarLeftItem.url);
          }}
        >
          {navBarLeftItem.name}<KeyboardArrowRightIcon />
        </Typography>
      ))}
    </Paper>
  );
}
// #091023;