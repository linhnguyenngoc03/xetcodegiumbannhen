import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/feature/Hooks";
import { close } from "../../../feature/Alert"


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  children: React.ReactNode;
}
export function AlertPopup({ children }: Props) {
  const alert = useAppSelector((state) => state.alert)
  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(close(false))
  };
  React.useEffect(() => {
  }, [alert])
  return (
    <>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity as AlertColor} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
