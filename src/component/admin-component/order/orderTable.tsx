import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  styled,
  Dialog,
  TablePagination,
  Button,
  Checkbox,
  Container,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ProductAndOrderItem } from "../../../../package/model/product/product-and-cartItem";
import { OrderAndOrderItem } from "../../../../package/model/order";
import { orderColor } from "@/pages/order/detail/[id]";
import { UserContext } from "@/component/auth/AuthContext";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { useRouter } from "next/router";
const StyledTableHead = styled(Typography)(() => ({
  fontWeight: 700,
}));

export default function OrderAdminTable({ order }: any) {
  const [page, setPage] = useState(0);
  const [selectOrder, setSelectOrder] = useState<OrderAndOrderItem | null>(
    null
  );
  const router = useRouter()
  const { setOpenLoading } = useContext(UserContext);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpenPopup] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleUpdateStatus = async (status: number) => {
    try {
      setOpenLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/order/updateOrderStatus",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            deliveryId: 0,
            note: "string",
            orderDate: "2023-07-09T15:50:57.388Z",
            orderId: selectOrder?.orderId,
            paymentDate: "2023-07-09T15:50:57.388Z",
            paymentId: 0,
            statusId: status,
            totalPayment: 0,
            userId: 0,
          }),
        }
      );
      dispatch(
        setOpen({
          open: true,
          message: "Changing success",
          severity: "success",
        })
      );
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setOpenPopup(false);
      router.reload()
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledTableHead width={20}>Mã</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead width={200}>Sản phẩm</StyledTableHead>
            </TableCell>
            <TableCell width={250}>
              <StyledTableHead>Phương thức thanh toán</StyledTableHead>
            </TableCell>

            <TableCell width={180}>
              <StyledTableHead>Tên khách hàng</StyledTableHead>
            </TableCell>
            <TableCell width={120}>
              <StyledTableHead>Tổng giá</StyledTableHead>
            </TableCell>
            <TableCell width={200}>
              <StyledTableHead>Ngày thanh toán</StyledTableHead>
            </TableCell>
            <TableCell width={120}>
              <StyledTableHead></StyledTableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order !== null && order !== undefined ? (
            order
              .slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row: OrderAndOrderItem) => (
                <TableRow key={row.orderId}>
                  <TableCell>{row.orderId}</TableCell>

                  <TableCell>
                    {row.productAndOrderItemList.map(
                      (item: ProductAndOrderItem, key: any) => (
                        <Typography variant="subtitle2" key={key}>
                          {item.quantity} x {item.product.productName}
                        </Typography>
                      )
                    )}
                  </TableCell>
                  <TableCell>{row.payment.paymentType}</TableCell>
                  <TableCell>{row.user.userName}</TableCell>
                  <TableCell>{row.totalPayment}</TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                      }}
                      disabled= {row.orderStatus.statusId === 5}
                      onClick={() => {
                        setOpenPopup(true);
                        setSelectOrder(row);
                      }}
                    >
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <Dialog open={true}></Dialog>
          )}
        </TableBody>
        <Dialog
          open={open}
          onClose={() => {
            setOpenPopup(false);
          }}
        >
          <DialogTitle>Cập nhật trạng thái</DialogTitle>
          <DialogContent>
            {/* {status.map((item) => (
              <MenuItem
                sx={{
                  color: orderColor(item.statusId),
                }}
                onClick={() => {
                  handleUpdateStatus(item.statusId);
                }}
              >
                {item.status}
              </MenuItem>
            ))} */}
            {selectOrder?.orderStatus.statusId === 1 ? (              <MenuItem
                sx={{
                  color: orderColor(2),
                }}
                onClick={() => {
                  handleUpdateStatus(2);
                }}
              >
                Đã xác nhận
              </MenuItem>
              
            ) : status.map((item) => (
              <MenuItem
                sx={{
                  color: orderColor(item.statusId),
                }}
                onClick={() => {
                  handleUpdateStatus(item.statusId);
                }}
              >
                {item.status}
              </MenuItem>
            ))} 
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Table>
      <TablePagination
        component="div"
        count={order !== undefined && order !== null ? order.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </TableContainer>
  );
}

const status = [
  {
    statusId: 2,
    status: "Đã xác nhận",
  },
  {
    statusId: 3,
    status: "Đang giao",
  },
  {
    statusId: 4,
    status: "Đã giao",
  },
  {
    statusId: 5,
    status: "Huỷ",
  },
];
