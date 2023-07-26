import React from 'react'
import GoogleIcon from "@mui/icons-material/Google";
import { StyledButton } from '../theme/button/StyledButton';
const SocialButton = ({handleLoginGoogle} : any) => {
  return (
    <StyledButton
    variant="contained"
    style={{ backgroundColor: "rgb(220 137 3)" }}
    fullWidth
    onClick={handleLoginGoogle}
  >
    <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
    Đăng nhập bằng google
  </StyledButton>
  )
}

export default SocialButton