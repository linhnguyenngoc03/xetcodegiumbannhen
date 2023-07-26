import { Typography } from "@mui/material";
import React from "react";

const Title1 = ({ title, children }: { title: string; children?: any }) => {
  return (
    <div
      style={{
        marginTop: "4rem",
        paddingTop: "1rem",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
        alignItems: "flex-end",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
        }}
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Title1;
