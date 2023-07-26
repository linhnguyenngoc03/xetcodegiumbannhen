import { Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";
import { setup } from "@/config/setup";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/router";
export default function Footer() {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundColor: setup.border,
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          "& .MuiButtonBase-root": {
            color: "white",
            fontSize: "1rem",
            fontWeight: "700",
            paddingBottom: "2rem",
          },
          "& .MuiTypography-root": {
            paddingBottom: "1rem",
            fontSize: "1.3rem",
            color: "white",
            fontWeight: "700",
          },
          "& .MuiSvgIcon-root": {
            transform: "scale(1.5)",
            marginRight: "1rem",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              Hỗ trợ khách hàng
            </Typography>
            <Button>
              <EmailIcon />
              {setup.email}
            </Button>
            <Button>
              <PhoneIcon />
              123 456789
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              Sản phẩm
            </Typography>
            <Typography>Tất cả sản phẩm</Typography>
            <Typography>Sản phẩm nổi bật</Typography>
            <Typography>Sản phẩm mới</Typography>
          </Grid>
          <Grid item xs={2.9}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              Thông tin liên hệ
            </Typography>
            <Typography>Liên hệ</Typography>
            <Typography>Về Hommie</Typography>
            <Typography>Cửa hàng</Typography>
          </Grid>
          <Grid item xs={2.1}>
            <div>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  paddingBottom: "0rem",
                  letterSpacing: ".1rem",
                }}
              >
                {setup.name}
              </Typography>
              <Typography
                component="div"
                sx={{
                  cursor: "pointer",
                  fontFamily: "Charm",
                  paddingLeft: "0.5rem",
                }}
              >
                Decoration and Gift
              </Typography>
            </div>
            <Toolbar>
              <Button>
                <FacebookIcon />
              </Button>
              <Button>
                <YouTubeIcon />
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
