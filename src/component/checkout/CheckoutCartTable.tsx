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
} from "@mui/material";
import { formatNumber } from "../../../package/function";
import { ProductAndCartItem } from "../../../package/model/product/product-and-cartItem";
import { ProductAndOrderItem } from "../../../package/model/order";

export default function CheckoutCartTable({
  orderList,
}: {
  orderList: ProductAndCartItem[] | undefined;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={350}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                }}
              >
                Sản phẩm
              </Typography>
            </TableCell>
            <TableCell
              width={120}
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Đơn giá
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "700",
              }}
              width={120}
              align="center"
            >
              Số Lượng
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Thành tiền
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList !== undefined ? orderList.map((row: ProductAndCartItem, index: any) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "5rem",
                      height: "4rem",
                      paddingRight: "1rem",
                    }}
                    src={"/assets/images/" + row.product.image}
                  />
                  <Typography variant="body1">
                    {row.product.productName}
                  </Typography>
                </div>
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
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
