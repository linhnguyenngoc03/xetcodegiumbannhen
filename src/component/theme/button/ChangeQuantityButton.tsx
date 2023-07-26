import { Grid, TextField, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  cursor: "pointer",
  height: "inherit",
  ":hover": {
    color: "green"
  }
})
export default function ChangeQuatityButton({ cartItem, productQuantity, updateCartItemsQuantity }: any) {
  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "0px",
          },
          border: "2px solid black",
          borderRadius: "1rem",
          height: "2.2rem"
        }}
      >
        <StyledGrid
          item
          xs={4}
          onClick={() => {
            updateCartItemsQuantity(cartItem.cartItemId, cartItem.quantity - 1, productQuantity)
          }}
        >
          <>
            <RemoveIcon />
          </>
        </StyledGrid>
        <Grid item xs={4} sx={{
          height: "inherit"
        }}>
          <TextField
            sx={{
              borderRadius: "0px",
              "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "auto",
                height: "0rem",
              }
            }}
            color="success"
            value={cartItem.quantity}
          />
        </Grid>
        <StyledGrid
          item
          xs={4}

          onClick={() => {
            updateCartItemsQuantity(cartItem.cartItemId, cartItem.quantity + 1, productQuantity)
          }}
        >
          <AddIcon />
        </StyledGrid>
      </Grid>
      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "center",
        }}
      >
        Còn lại: {productQuantity}
      </Typography>
    </>
  );
}
