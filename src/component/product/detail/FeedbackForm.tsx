import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { updateFeedbackApi, deleteFeedbackApi } from "@/pages/api/feedback";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
export default function FeedbackForm({ feedback }: any) {
  const [openPopup, setOpenPopup] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    const updateFeedback = async () => {
      const response = await updateFeedbackApi(
        data.content,
        feedback.user,
        feedback.product,
        feedback.date,
        feedback.feedbackId
      );
      if (response) {
        setOpenPopup(false)
        dispatch(
          setOpen({
            open: true,
            message: "Cập nhật thành công",
            severity: "success",
          })
        );
      }
    };
    updateFeedback()
  };

  return (
    <>
      <Dialog
        open={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          Sửa góp ý
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <div>
              <Grid container spacing={0}>
                <Grid item xs={15}>
                  <label htmlFor="nội dung">* Nội dung</label>
                  <TextField
                    fullWidth
                    type="text"
                    color="secondary"
                    size="small"
                    id="nội dung"
                    defaultValue={feedback.content}
                    {...register("content", {
                      required: true,
                    })}
                  />
                </Grid>       
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: "1rem" }}
                  >
                    Gửi đánh giá
                    <SendIcon
                      sx={{
                        marginLeft: "0.5rem",
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </form>
      </Dialog>
      <IconButton
        aria-label="update"
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        <EditIcon
          style={{
            width: 30,
            height: 30,
          }}
          color="success"
        />
      </IconButton>
    </>
  );
}
