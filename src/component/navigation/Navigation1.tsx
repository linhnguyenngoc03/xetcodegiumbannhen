import { AppBar,  Box, Button, Container, Grid, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import NavButton from "../theme/button/NavButton";
import SearchBox from "../theme/search/SearchBox";
import { categoryList, setup } from "@/config/setup";
import CartIconButton from "../theme/button/CartIconButton";
import AccountIconButton from "../theme/button/AccountIconButton";
import { CheckInView } from "@/checkInScreen";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
import { UserContext } from "../auth/AuthContext";
import UrlImage from "../theme/image/Image1";
import LogoTitle from "../theme/title/LogoTitle";

const Navigation1 = () => {
  const [isVisible, setIsVisible] = useState<any>(true);
  const { cart } = useContext(UserContext)
  const router = useRouter()
  return (
    <CheckInView setIsVisible={setIsVisible}>
      <AppBar
        sx={{
          backgroundColor: setup.backgroundColor,
          paddingBottom: "0.5rem",
          boxShadow: isVisible ? "none" : null
        }}
      >
        <Container maxWidth="lg">
          <div
            style={{
              display: "grid",
              marginTop: "0.5rem",
              alignItems: "center",
              gridTemplateColumns: "25% 55% 20%",
            }}
          >
            {/* <LogoTitle /> */}
            <div style={{
              height: "4.8rem",
              paddingRight: "1rem"
            }}>
              <UrlImage height="6rem" img="/assets/images/logo.jpg" url="/"/>
            </div>
            <Box flexGrow={1}>
              <SearchBox />
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title={auth.currentUser !== null ? `Login as ${auth.currentUser?.email}` : ""}>
                <AccountIconButton href={auth.currentUser !== null ? `/profile/${auth.currentUser?.uid}` : "/login"} />
              </Tooltip>
              <CartIconButton number={cart !== null ? cart.productAndCartItemList.length : 0} url={auth.currentUser !== null ? "/cart" : "/"} />
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={2.5}>
                <NavButton
                  categoryList={categoryList}
                  isVisible={isVisible}
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </AppBar>
    </CheckInView>
  );
};

export default Navigation1;
