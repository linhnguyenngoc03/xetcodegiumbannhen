import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    OutlinedInput,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { setup } from "@/config/setup";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import Address from "../auth/Address";
import { StyledButton } from "../theme/button/StyledButton";
import FlexBox from "../theme/flexbox/FlexBox";

export default function AddressButton({ handleAddAddress }: any) {
    const [openPopup, setOpenPopup] = useState<any>(false);
    const [address, setAddress] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const handleChange = (value: any) => {
        setStreet(value);
    };
    return (
        <>
            <Dialog
                open={openPopup}
                onClose={() => {
                    setOpenPopup(false);
                }}
                sx={{
                    maxWidth: "35rem",
                    margin: "auto"
                }}
                fullWidth
            >
                <DialogTitle>Thêm địa chỉ mới</DialogTitle>
                <DialogContent>
                    <Address setAddress={setAddress} />
                    <div style={{ marginTop: "1rem" }}></div>
                    <label htmlFor="address">* Số nhà tên đường</label>
                    <OutlinedInput
                        placeholder="Địa chỉ"
                        size="small"
                        sx={{
                            width: "100%",
                            marginBottom: "1rem"
                        }}
                        onChange={(e) => {
                            handleChange(e.target.value);
                        }}
                        endAdornment={<AddHomeIcon />}
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={address.split(",").length > 2 && street !== "" ? false : true}
                        sx={{
                            backgroundColor: setup.inside,
                        }}
                        onClick={() => {
                            handleAddAddress({
                                address: `Địa chỉ: ${street}, ${address}`
                            })
                            setOpenPopup(false)
                        }}
                    >
                        Submit
                    </StyledButton>
                </DialogContent>
            </Dialog>
            <FlexBox justifyContent="flex-end">
                <StyledButton
                    onClick={() => {
                        setOpenPopup(true);
                        setAddress("")
                    }}
                    variant="contained"
                >
                    New Address
                </StyledButton>
            </FlexBox>
        </>
    );
}
