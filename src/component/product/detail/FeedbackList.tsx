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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Feedback } from "../../../../package/model/feedback";
import { useRouter } from "next/router";
import { Dialog } from "@mui/material";
import { auth } from "@/config/firebase";
import FeedbackForm from "./FeedbackForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFeedbackApi } from "@/pages/api/feedback";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup";
import { UserContext } from "@/component/auth/AuthContext";
import { StyledTypography } from "@/component/theme/text/Typography";
import { useForm } from "react-hook-form";


export default function FeedbackTable({ feedbackList }: { feedbackList: Feedback[] }) {
  const [selectFeedbacks, setSelectFeedbacks] = useState<any>([]);
  const { setOpenLoading } = useContext(UserContext)
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
  const router = useRouter()
  const data = router.query
  const filter = (feedbackList: Feedback[]) => {
    let feedbackFilterList: Feedback[] = feedbackList
    return feedbackList
  }
  const currentCust = auth.currentUser?.uid
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "80rem", fontWeight: "700" }}>
              Đánh giá về sản phẩm
            </TableCell>
            <TableCell sx={{ width: "8rem", fontWeight: "500", display: "inline-flex"}}>
              <span style={{marginLeft:"-1rem", marginRight:"0.2rem", color: "green"}}>Sửa</span>/
              <span style={{marginLeft:"0.2rem", color:"red"}}>Xóa</span>
              <form
                style={{
                  display: "flex",
                  width: "2rem", 
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Button aria-label="delete" size="small" 
                  onClick={() => setOpenConfirmPopup(true)} disabled={selectFeedbacks.length == 0}
                  sx={{ marginRight: "-1rem", marginTop: "-0.5rem"}}>
                    <Typography color="error">
                      {selectFeedbacks.length > 0
                        ? `${selectFeedbacks.length}`
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
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filter(feedbackList).slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((row: any) => (
              <TableRow key={row.feedbackId}>
                <TableCell align="justify" size="small" style={{ wordWrap: 'break-word' }}>
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <AccountCircleIcon sx={{
                      color: "gray",
                      margin: "-0.1em",
                      marginRight: "0.5em"
                    }}></AccountCircleIcon><span style={{fontWeight: "bold"}}>{row.user.userName}</span>
                  </div>
                  <p style={{ marginRight: "2rem", marginLeft: "2rem" }}>
                    {row.content}
                  </p>
                  <span style={{ float: 'right', marginRight: "2rem" }}>
                    {row.date}
                  </span>
                </TableCell>
                {row.user.userUid === currentCust ?
                  <TableCell>
                    <FeedbackForm feedback={row}></FeedbackForm>
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
                  </TableCell> : <TableCell></TableCell>}
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
