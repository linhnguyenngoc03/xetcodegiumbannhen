import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"), {
  ssr: false,
});

const LoadingIconButton = ({ children, loading, ...props }: any) => {
  return (
    <div>
      <IconButton
        {...props}
        sx={{
          display: loading === true ? "none" : null,
        }}
      >
        {children}
      </IconButton>
      <LoadingButton
        loading={loading}
        sx={{
          height: "48px",
          display: loading === true ? null : "none",
        }}
      >
      </LoadingButton>
      </div>
  );
};

export default LoadingIconButton;
