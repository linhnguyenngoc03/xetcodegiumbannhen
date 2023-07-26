import styled from "@emotion/styled";
import { InputAdornment, TextField } from "@mui/material";
import React, { forwardRef } from "react";

const StyledOutLinedInput = styled(TextField)({
  marginBottom: "0.5rem",
  "& .MuiInputBase-input": {
    // padding: "0.9rem",
    backgroundColor: "white"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid gray",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #FF9B9B !important",
  },
});
const StyledOutlinedInput = forwardRef(
  ({ label, id, icon, ...props }: any, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          style={{
            margin: "0.5rem 0rem",
            color: "gray",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          {label}
        </label>
        <StyledOutLinedInput
        size="small"
          ref={ref}
          fullWidth
          className={id}
          {...props}
          InputProps={icon !== undefined ? {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          } : {}}
        />
      </>
    );
  }
);
StyledOutlinedInput.displayName = "StyledOutlinedInput";
export default StyledOutlinedInput;
