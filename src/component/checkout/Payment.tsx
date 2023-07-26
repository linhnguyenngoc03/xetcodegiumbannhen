import { Typography, Toolbar, CardMedia, Box, Checkbox } from "@mui/material";
import React from "react";

export default function CheckoutPayment({ setSelectPayment, selectPayment, paymentList }: any) {

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
        }}
      >
        Phương thức thanh toán
      </Typography>
      {paymentList !== undefined ? paymentList.map((payment: any) => (
        <div
          style={{
            border: "2px solid #1a9cb7",
            borderRadius: "4px",
            marginTop: "1rem",
          }}
          key={payment.paymentId}
        >
          <Toolbar>
            <CardMedia
              component="img"
              src={
                payment.paymentId === 1
                  ? "/assets/images/VNPAY.jpg"
                  : "/assets/images/COD.jpg"
              }
              sx={{
                width: "3rem",
                height: "3rem",
                marginRight: "1rem",
              }}
            />
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              {payment.paymentType}
            </Typography>
            <Box flexGrow={1}></Box>
            <Checkbox
              color="success"
              checked={
                selectPayment !== null
                  ? selectPayment.paymentId === payment.paymentId
                    ? true
                    : false
                  : false
              }
              onChange={(event,checked) => {
                if (checked === true) {
                  setSelectPayment(payment)
                } else {
                  setSelectPayment(null)
                }
              }}
            />
          </Toolbar>
        </div>
      )) : null}
    </>
  );
}
