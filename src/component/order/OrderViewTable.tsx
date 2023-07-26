import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  CardMedia,
  styled,
  Box,
} from "@mui/material";
import React from "react";
import { formatNumber } from "../../../package/function";
import {
  ProductAndCartItem,
  ProductAndOrderItem,
} from "../../../package/model/product/product-and-cartItem";
import { setup } from "@/config/setup";
import { Payment } from "../../../package/model/payment";

const StyledText = styled(Typography)({
  fontWeight: 700,
  margin: "0.5rem 0rem",
  fontSize: "1.1rem",
});
const StyledTableHead = styled(TableCell)({
  fontWeight: "700",
  fontSize: "1.1rem",
});
const OrderViewTable = ({
  orderList,
  payment,
  total,
}: {
  orderList: ProductAndOrderItem[];
  payment: Payment;
  total: number;
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        padding: "1rem 4rem",
        "& .MuiTableCell-root": {
          border: "0px solid gray",
        },
      }}
    >
      <StyledText
        sx={{
          color: setup.border,
          fontSize: "1.3rem",
        }}
      >
        Sản phẩm
      </StyledText>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableHead>Hình ảnh</StyledTableHead>
            <StyledTableHead
              sx={{
                fontWeight: "700",
              }}
            >
              Sản phẩm
            </StyledTableHead>
            <StyledTableHead
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Đơn giá
            </StyledTableHead>
            <StyledTableHead
              sx={{
                fontWeight: "700",
              }}
              align="center"
            >
              Số Lượng
            </StyledTableHead>
            <StyledTableHead
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Thành tiền
            </StyledTableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList !== undefined
            ? orderList.map((row: ProductAndOrderItem, index: any) => (
                <TableRow
                  key={index}
                  sx={{
                    ":hover": {
                      backgroundColor: "#EDF1F5",
                    },
                  }}
                >
                  <TableCell>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "6rem",
                        height: "6rem",
                      }}
                      src={"/assets/images/" + row.product.image}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {row.product.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {row.product.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {row.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      {formatNumber(row.product.price * row.quantity)} VND
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "1rem 0rem 1rem"
        }}
      >
        <StyledText>
          Phương thức thanh toán:
          <span
            style={{
              marginLeft: "1rem",
              fontWeight: "500",
            }}
          >
            {payment.paymentType}
          </span>
        </StyledText>
        <Box flexGrow={1}></Box>
        <StyledText>
          Tổng tiền:
          <span
            style={{
              marginLeft: "5rem",
              fontWeight: "700",
              fontSize: "2rem",
              marginRight: "2.5rem",
              color: setup.border
            }}
          >
            {formatNumber(total)}
          </span>
        </StyledText>
      </div>
    </TableContainer>
  );
};

export default OrderViewTable;
