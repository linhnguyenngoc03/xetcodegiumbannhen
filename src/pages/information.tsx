import { setup } from "@/config/setup";
import {
  CardMedia,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import Head from "next/head";
import LoginCard from "@/component/auth/LoginCard";
import InformationCard from "@/component/auth/InformationCard";
export default function Information() {
  return (
    <div>
      <Head>
        <title>Information</title>
      </Head>
      <CardMedia
        component="img"
        alt="green iguana"
        image="/assets/images/banner.jpg"
        style={{
          height: "100vh",
          position: "absolute",
        }}
      />
      <Dialog open={true} fullWidth sx={{
        maxWidth: "35rem",
        margin: "auto",
        "& .MuiPaper-root": {
          borderRadius: "1rem",
          padding: " 1rem 2rem",
        }
      }}>
        <DialogTitle
          sx={{
            display: {
              xs: "none", sm: "block", cursor: "pointer",
              letterSpacing: '.1rem',
            },
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
            fontFamily: 'Roboto Serif',
          }}
        >
          {setup.name}
        </DialogTitle>
        <DialogContent>
          <InformationCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
