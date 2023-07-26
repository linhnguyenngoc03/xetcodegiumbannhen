import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { createFeedbackApi } from "@/pages/api/feedback";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Product } from "../../../../package/model/product";
import { User } from "../../../../package/model/user";

export default function FeedbackCreateForm({ productId, userId}: any ){
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [content, setContent] = useState("")
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    const createFeedback = async () => {
      const response = await createFeedbackApi(
        data.content,
        userId,
        productId,
        "",
        0
      );
      if (response) {
        dispatch(
          setOpen({
            open: true,
            message: "Gửi thành công",
            severity: "success",
          })
        );
        reset();
      }
    };
    createFeedback()
  };

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <div
              style={{
                paddingTop: "1rem",
              }}
            >
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={15}
                  sx={{
                    marginBottom: "2rem",
                  }}
                >
                  <label htmlFor="nội dung" style={{marginLeft : "3.5rem"}}>Thêm đánh giá</label><br/>
                  <div style={{display : "flex", marginBottom : "1rem"}}>
                    <AccountCircleIcon color="primary" sx={{
                      fontSize : "2.5rem", 
                      margin : "-0.1em",
                      marginRight : "0.5em"
                    }}></AccountCircleIcon>
                    <TextField
                      fullWidth
                      sx={{
                        bgcolor : "rgb(233, 233, 233)",
                      }}
                      maxLength={200}
                      minLength={10}
                      type="text"
                      color="secondary"
                      size="small"
                      id="nội dung"
                      defaultValue={content}
                    {...register("content", { required: true, })}/>
                  </div>
                  
                </Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: "-3rem" }}
                  >
                    Gửi
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
      </>
  );
}
