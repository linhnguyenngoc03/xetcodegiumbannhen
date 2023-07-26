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
} from "@mui/material";
import React, { useState } from "react";
import {
  OrderAndOrderItem,
  ProductAndOrderItem,
} from "../../../package/model/order";
import StyledLink from "../theme/navLink/Link";
import orderId from "@/pages/order/detail/[id]";
const StyledTableHead = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "center",
}));

export default function OrderTable({
  order,
}: {
  order: OrderAndOrderItem[] | null | undefined;
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
  return (
    <TableContainer
      component={Paper}
      sx={
        {
          // "& .MuiTableCell-root": {
          //   border: "1px solid gray",
          // },
        }
      }
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledTableHead>Mã</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Ngày đặt hàng</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Tổng giá</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Phương thức thanh toán</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Chi tiết</StyledTableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order !== undefined && order !== null ? (
            order
              .slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row: OrderAndOrderItem) => (
                <TableRow key={row.orderId}>
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell align="center">{row.orderDate}</TableCell>
                  <TableCell align="center">{row.totalPayment} VND</TableCell>
                  <TableCell align="center">{row.payment.paymentType}</TableCell>
                  <TableCell align="center">
                    <StyledLink href={`/order/detail/${row.orderId}`}>chi tiết</StyledLink>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <Dialog open={true} />
          )}
        </TableBody>
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
