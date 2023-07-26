import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
export interface Alert{
    open: boolean
    message: string
    severity: string
  }
  
export const alertSlice = createSlice({
    name: "alert",
    initialState: {open: false, message: "", severity: "success"} as Alert,
    reducers: {
        setOpen: (state, action: PayloadAction<Alert>) => {
            return action.payload;
        },
        close: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        }
    }
})
export const {setOpen, close} = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert
export default alertSlice.reducer;
