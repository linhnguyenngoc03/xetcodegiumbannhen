import * as React from "react";
import Card from "@mui/material/Card";

import { Skeleton } from "@mui/material";

export default function ProductSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "1rem",
        // boxShadow: "none",
      }}
    >
      <Skeleton width="100%" height="16rem" />
      <div
        style={{
          padding: "1rem 1rem 0.5rem",
        }}
      >
        <Skeleton height="26.3px" width="100%" />
        <Skeleton height={24} width="30%" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0rem",
          }}
        >
          <Skeleton height={12} variant="rounded" width={120}/>
          <Skeleton height={48} width={48} variant="circular" />
        </div>
      </div>
    </Card>
  );
}
