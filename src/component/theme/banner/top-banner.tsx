import { setup } from "@/config/setup";
import { CardMedia, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
export default function TopBanner({ children, slider }: any) {
  const [index, setIndex] = useState<any>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex: any) => (prevIndex + 1) % slider.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <CardMedia
        component="img"
        alt="green iguana"
        image={`/assets/images/${slider[index]}`}
        sx={{
          height: "45rem",
          paddingTop: "9rem",
          backgroundColor: setup.backgroundColor
          // objectFit: "contain"
        }}
      />
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "-28rem",
        height: "28rem",
        position: "absolute",
        zIndex: 3
      }}
      className="banner-paging">
        <Pagination
          count={3}
          variant="outlined"
          hideNextButton
          hidePrevButton
          size="small"
          onChange={(event, value: any) => {
            setIndex(value - 1);
          }}
          page={index % 3 +1}
          sx={{
            "& .MuiButtonBase-root" : {
              color: "rgba(0,0,0,0)",
              margin: "1rem 0.5rem",
              borderRadius: "1rem",
              width: "3rem",
              height: "0.5rem"
            },
            "& .Mui-selected": {
              backgroundColor: `gray !important`,
            },
          }}
        />
      </div>
      {children}
    </div>
  );
}
