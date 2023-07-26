import {
  Button,
  CardMedia,
  Checkbox,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFeedbackApi } from "@/pages/api/feedback";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup";
import { UserContext } from "@/component/auth/AuthContext";
import { StyledTypography } from "@/component/theme/text/Typography";
import { useForm } from "react-hook-form";
import { Feedback } from "../../../../package/model/feedback";
import { useRouter } from "next/router";
import FeedbackEditForm from "./FeedbackEditForm";


export default function FeedbackTable({ feedbackList }: {
  feedbackList: Feedback[]
}) {
  const router = useRouter()
  const data = router.query
  const filter = (feedbackList: Feedback[]) => {
    let feedbackFilterList: Feedback[] = feedbackList
      return feedbackList
  }
  const [selectFeedbacks, setSelectFeedbacks] = useState<any>([]);
  const { setOpenLoading } = useContext(UserContext)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useAppDispatch();
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false);
  const { handleSubmit, register } = useForm()
  const onSubmit = (data: any) => {
    if (data.searchValue === "") {
      router.push("/admin/feedback")
    }
  }
    const handleDelete = async () => {
      try {
        setOpenLoading(true)
        await deleteFeedbackApi(selectFeedbacks);
        dispatch(
          setOpen({
            open: true,
            message: "Xóa thành công",
            severity: "success",
          })
        );
      } catch (error: any) {

      }
      setOpenLoading(false)
      setSelectFeedbacks([])
    }

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
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledTypography variant="h4">Góp ý</StyledTypography>
          <form
            style={{
              display: "flex",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Button aria-label="delete" size="small" onClick={() => setOpenConfirmPopup(true)} disabled={selectFeedbacks.length == 0}>
                <Typography color="error">
                  {selectFeedbacks.length > 0
                    ? `${selectFeedbacks.length} selected`
                    : ""}
                </Typography>
                <DeleteIcon
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  color="error"
                />
              </Button>
            </div>
          </form>
        </Toolbar>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ width: "150px", fontWeight: "700" }}>
                ID
              </TableCell>
              <TableCell sx={{ width: "150px", fontWeight: "700" }}>
                Tên người dùng
              </TableCell>
              <TableCell sx={{ width: "150px", fontWeight: "700" }}>
                Tên sản phẩm
              </TableCell>
              <TableCell sx={{ width: "350px", fontWeight: "700" }}>
                Nội dung
              </TableCell>
              <TableCell sx={{ width: "150px", fontWeight: "700" }}>
                Ngày tạo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter(feedbackList).slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row: any) => (
                <TableRow key={row.feedbackId}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="error"
                      onChange={(e) => {
                        if (e.currentTarget.checked === true) {
                          setSelectFeedbacks([...selectFeedbacks, row.feedbackId]);
                        } else {
                          setSelectFeedbacks(
                            selectFeedbacks.filter(
                              (feedbackId: any) => !(row.feedbackId === feedbackId)
                            )
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.feedbackId}</TableCell>
                  <TableCell>{row.user.userName}</TableCell>
                  <TableCell>{row.product.productName}</TableCell>
                  <TableCell align="justify" size="small" style={{ wordWrap: 'break-word' }}>{row.content}</TableCell>
                  <TableCell align="justify">{row.date}</TableCell>
                    {/*<FeedbackEditForm feedback={row}/>*/} 
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filter(feedbackList).length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
        <ConfirmPopup openConfirmPopup={openConfirmPopup} setOpenConfirmPopup={setOpenConfirmPopup} func={handleDelete} />
      </TableContainer>
    );
  }
