import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardMedia, Checkbox, Typography, styled } from "@mui/material";
import { formatNumber } from "../../../package/function";
import ChangeQuatityButton from "../theme/button/ChangeQuantityButton";
import ConfirmPopup from "../theme/confirm/ConfirmPopup";
import { ProductAndCartItem } from "../../../package/model/product/product-and-cartItem";

const StyledTableHeadCell = styled(TableCell)({
  fontWeight: 700,
  color: "gray",
  textAlign: "center",
});

export default function CartTable({
  cart,
  handleDelete,
  setOrderList,
  orderList,
  updateCartItemsQuantity,
}: any) {
  const [openConfirmPopup, setOpenConfirmPopup] =
    React.useState<boolean>(false);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={500}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                }}
              >
                Sản phẩm
              </Typography>
            </TableCell>
            <StyledTableHeadCell width={170}>Đơn giá</StyledTableHeadCell>
            <StyledTableHeadCell width={170}>Số lượng</StyledTableHeadCell>
            <StyledTableHeadCell>Thành tiền</StyledTableHeadCell>
            <StyledTableHeadCell></StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.productAndCartItemList.map((row : ProductAndCartItem, key: any) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="success"
                    disabled={row.product.quantity === 0 && row.product.status !== "xoá"}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setOrderList([...orderList, row.cartItemId]);
                      } else {
                        const newOrderList = orderList.filter(
                          (cartItemId: any) => row.cartItemId !== cartItemId
                        );
                        setOrderList(newOrderList);
                      }
                    }}
                    sx={{
                      ":hover": {
                        backgroundColor: "white",
                      },
                    }}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      width: "7rem",
                      height: "5rem",
                      paddingLeft: "1rem",
                      marginRight: "1rem",
                    }}
                    src={"/assets/images/" + row.product.image}
                  />
                  <Typography variant="h6">
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
                <ChangeQuatityButton
                  updateCartItemsQuantity={updateCartItemsQuantity}
                  cartItem={row}
                  productQuantity={row.product.quantity}
                />
              </TableCell>
              <TableCell align="center">
                <Typography>
                  {formatNumber(row.product.price * row.quantity)} VND
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setOpenConfirmPopup(true)
                  }}
                  sx={{
                    margin: "1rem",
                  }}
                >
                  Xoá
                </Button>
              </TableCell>
              <ConfirmPopup
                openConfirmPopup={openConfirmPopup}
                setOpenConfirmPopup={setOpenConfirmPopup}
                func={handleDelete}
                cartItemId={row.cartItemId}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
