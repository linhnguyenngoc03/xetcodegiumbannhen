import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React from "react";
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"), {
  ssr: false,
});

const NewLoadingButton= styled(LoadingButton) ({
  boxShadow: "0px 0px 0px black",
  fontWeight: 600,
  color: "white",
  paddingTop: "0.7rem",
  paddingBottom: "0.7rem",
  margin: "0rem 0rem 0.5rem",
})
const StyledLoadingButton = ({ children, ...props }: any) => {
  return <NewLoadingButton {...props}>{children}</NewLoadingButton>;
};

export default StyledLoadingButton;
